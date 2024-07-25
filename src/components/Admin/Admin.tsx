// import React, { useState, useEffect, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// interface Stream {
//   clientId: string;
//   url: string;
// }

// const Admin: React.FC = () => {
//   const [streams, setStreams] = useState<Stream[]>([]);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:3010');
//     console.log('Connected to server');

//     socketRef.current.on('stream', ({ clientId, data }: { clientId: string; data: BlobPart }) => {
//       console.log('Received stream from client:', clientId);

//       const url = URL.createObjectURL(new Blob([data], { type: 'video/webm' }));

//       setStreams((prevStreams) => {
//         if (!prevStreams.some((stream) => stream.clientId === clientId)) {
//           return [...prevStreams, { clientId, url }];
//         }
//         return prevStreams;
//       });
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, []);

//   console.log('streams', streams)

//   return (
//     <div>
//       <h2>Admin Live Streams</h2>
//       {streams.map(({ clientId, url }) => (
//         <div key={clientId}>
//           <h3>Client: {clientId}</h3>
//           <video
//             src={url}
//             controls
//             autoPlay
//             style={{ width: '80%', border: '1px solid black' }}
//           ></video>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Admin;


import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AdminContainer } from './Admin.styled';

// const serverUrl = "http://localhost:3010";
const serverUrl = "https://exam-backend-theta.vercel.app";

const socket = io(serverUrl); // Ensure this matches your backend server URL

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









