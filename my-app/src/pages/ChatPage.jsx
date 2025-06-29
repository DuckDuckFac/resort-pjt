import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import QuestionInput from '../components/QuestionInput';
import ChatResponse from '../components/ChatResponse';
import styles from './ChatPage.module.css';

function ChatPage() {
  const [imageName, setImageName] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
// 임시응답답
    setResponse('깨끗이 씻은 후 플라스틱으로 분리배출 하세요.');
  };

  return (
    <div className={styles.container}>
        <h2 className={styles.title}>♻️ Re:sort 챗봇</h2>

      <ImageUpload setImageName={setImageName} />
      <QuestionInput question={question} setQuestion={setQuestion} />

      <button className={styles.submitButton} onClick={handleSubmit}>제출하기</button>

      <ChatResponse response={response} />
    </div>
  );
}

export default ChatPage;
//  const handleSubmit = async () => {
//   const formData = new FormData();
//   formData.append('image', selectedFile);     
//   formData.append('question', question);     

//   const res = await fetch('http://localhost:8000/analyze', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await res.json();
//   setResponse(data.answer);
// };
