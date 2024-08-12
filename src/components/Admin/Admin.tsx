import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AdminContainer } from './Admin.styled';
import { SERVER_URL } from '../../utils/consts/globalConst';

// const serverUrl = "http://localhost:3010";
// const serverUrl = 'https://exam-backend-theta.vercel.app';
const serverUrl = 'https://backend.zerocodecourses.com';

const socket = io(serverUrl);


interface Stream {
  clientId: string;
  image: string;
}

const Admin: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const canvasRefs = useRef<{ [key: string]: HTMLCanvasElement }>({});

  useEffect(() => {
    const handleStream = (data: { clientId: string; image: string }) => {
      setStreams((prevStreams) => {
        const existingStreamIndex = prevStreams.findIndex((stream) => stream.clientId === data.clientId);

        if (existingStreamIndex >= 0) {
          // Update existing stream
          const updatedStreams = [...prevStreams];
          updatedStreams[existingStreamIndex] = { ...updatedStreams[existingStreamIndex], image: data.image };
          return updatedStreams;
        } else {
          // Add new stream
          return [...prevStreams, { clientId: data.clientId, image: data.image }];
        }
      });
    };

    socket.on('stream', handleStream);

    return () => {
      socket.off('stream', handleStream);
    };
  }, []);

  useEffect(() => {
    streams.forEach((stream) => {
      const canvas = canvasRefs.current[stream.clientId];
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
          };
          img.src = stream.image;
        }
      }
    });
  }, [streams]);

  return (
    <div>
      <h2>Admin Live Streams</h2>
      <AdminContainer>
        {streams.map(({ clientId }, index) => (
          <div key={clientId}>
            <h3>Student {index + 1}: {clientId}</h3>
            <canvas
              ref={(el) => {
                if (el) {
                  canvasRefs.current[clientId] = el;
                }
              }}
              style={{ border: '1px solid black', marginBottom: '10px', width: '100%' }}
            />
          </div>
        ))}
      </AdminContainer>
    </div>
  );
};

export default Admin;




// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3010'); // Replace with your backend URL

// interface StudentStream {
//   id: string;
//   stream: MediaStream;
// }

// const Admin: React.FC = () => {
//   const [studentStreams, setStudentStreams] = useState<StudentStream[]>([]);
//   const peerConnections = useRef<Record<string, RTCPeerConnection>>({});

//   useEffect(() => {
//     const handleOffer = async (id: string, offer: RTCSessionDescriptionInit) => {
//       const peerConnection = new RTCPeerConnection({
//         iceServers: [
//           { urls: 'stun:stun.l.google.com:19302' },
//         ],
//       });

//       peerConnections.current[id] = peerConnection;

//       peerConnection.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit('ice-candidate', { candidate: event.candidate, id });
//         }
//       };

//       peerConnection.ontrack = (event) => {
//         setStudentStreams((prevStreams) => {
//           const existingStream = prevStreams.find((stream) => stream.id === id);
//           if (existingStream) {
//             return prevStreams.map((stream) =>
//               stream.id === id ? { ...stream, stream: event.streams[0] } : stream
//             );
//           }
//           return [
//             ...prevStreams,
//             { id, stream: event.streams[0] },
//           ];
//         });
//       };

//       try {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit('answer', { answer, id });
//       } catch (error) {
//         console.error('Error creating answer', error);
//       }
//     };

//     socket.on('offer', ({ id, offer }) => {
//       handleOffer(id, offer);
//     });

//     socket.on('ice-candidate', async ({ id, candidate }) => {
//       if (peerConnections.current[id]) {
//         try {
//           await peerConnections.current[id].addIceCandidate(new RTCIceCandidate(candidate));
//         } catch (error) {
//           console.error('Error adding received ICE candidate', error);
//         }
//       }
//     });

//     return () => {
//       Object.values(peerConnections.current).forEach((pc) => pc.close());
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Admin View</h1>
//       <div>
//         {studentStreams.map(({ id, stream }) => (
//           <div key={id}>
//             <h2>Student {id}</h2>
//             <video
//               autoPlay
//               playsInline
//               style={{ width: '400px' }}
//               ref={(video) => {
//                 if (video && stream) {
//                   video.srcObject = stream;
//                 }
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Admin;
















