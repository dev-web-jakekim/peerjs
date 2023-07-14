import { useEffect, useState } from "react";
import PeerInstance from "./core/Peer";
import Video from "./components/Video";
import styled from "styled-components";

function App() {

  const [peerId, setPeerId] = useState("");
  const [stream, setStream] = useState(null);
  const [targetPeerId, setTargetPeerId] = useState("");
  const [targetStream, setTargetStream] = useState(null);

  useEffect(() => {
    PeerInstance.on('open', (id) => {
      setPeerId(id);
    });

    PeerInstance.on('call', (call) => {
      let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      getUserMedia({video: true, audio: true}, (stream) => {
        setStream(stream);
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          setTargetStream(remoteStream);
        });
      });
    });
  }, []);

  const call = async (targetPeerId) => {
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video: true, audio: true}, (stream) => {
      setStream(stream);
      let call = PeerInstance.call(targetPeerId, stream);
      call.on('stream', (remoteStream) => {
        setTargetStream(remoteStream);
      });
    }, (err) => {
      console.log('Failed to get local stream', err);
    });
  }

  return (
      <Container>
        <Header>
          <Info>
            My ID : {peerId}
          </Info>
          <Action>
            <Input type="text" value={targetPeerId} onChange={e => setTargetPeerId(e.target.value)}/>
            <Button onClick={(e) => call(targetPeerId)}>CALL</Button>
          </Action>
        </Header>
        <Contents>
          <Video stream={stream}></Video>
          <Video stream={targetStream}></Video>
        </Contents>
      </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  border: 1px solid #333;
  margin: 50px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Info = styled.div``;

const Action = styled.div`
  margin-left: auto;
`;
const Input = styled.input`
  height: 24px;
  border-radius: 8px;
`;
const Button = styled.button`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background-color: #333;
  margin-left: 8px;
  border-radius: 8px;
  padding: 4px 8px;
  border-color: #333;
  &:hover {
    background-color: darkgray;
    border-color: darkgray;
  }
`;
const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 50px;
`;

export default App;
