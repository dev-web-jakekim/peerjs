import { useEffect, useRef } from "react";
import styled from "styled-components";

// 비디오 컴포넌트의 경우 전달받은 스트림 데이터에 따라 뷰를 핸들링
// 스트림 데이터가 정상적으로 전달될 경우 비디오 태그를 통해 표시
// 그렇지 않은 에러 발생 경우에는 관련 UI
// 통신 시작 전 또는 종료 경우에는 관련 UI

const Video = ({ stream }) => {

    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        } else {
            videoRef.current.srcObject = stream ? stream : null;
        }
        console.log(stream)
    }, [stream]);

    const renderVideo = () => {
        const videoEl = <div></div>
    }

    return (
        <Container>
            <Title> {stream.id || ''} </Title>
            <Contents ref={videoRef} autoPlay />
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 500px;
  overflow: hidden;
`;
const Title = styled.span`
  font-size: 14px;
`;
const Contents = styled.video`
  width: 100%;
  height: 100%;
`;
export default Video;