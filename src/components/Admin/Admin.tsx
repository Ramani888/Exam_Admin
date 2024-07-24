import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Stream {
  clientId: string;
  url: string;
}

const Admin: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3010');
    console.log('Connected to server');

    socketRef.current.on('stream', ({ clientId, data }: { clientId: string; data: BlobPart }) => {
      console.log('Received stream from client:', clientId);

      const url = URL.createObjectURL(new Blob([data], { type: 'video/webm' }));

      setStreams((prevStreams) => {
        if (!prevStreams.some((stream) => stream.clientId === clientId)) {
          return [...prevStreams, { clientId, url }];
        }
        return prevStreams;
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Admin Live Streams</h2>
      {streams.map(({ clientId, url }) => (
        <div key={clientId}>
          <h3>Client: {clientId}</h3>
          <video
            src={url}
            controls
            autoPlay
            style={{ width: '80%', border: '1px solid black' }}
          ></video>
        </div>
      ))}
    </div>
  );
};

export default Admin;
