import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1>♻️ Re:sort - 분리배출 도우미 챗봇</h1>
      <p>사진과 질문으로 정확한 분리배출 방법을 안내받아보세요.</p>
      <button onClick={() => navigate('/chat')}>챗봇 시작하기</button>
    </div>
  );
}

export default MainPage;
