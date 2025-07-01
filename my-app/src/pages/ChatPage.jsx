import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaImage } from 'react-icons/fa';

function ChatPage() {
  const [imageName, setImageName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const chatEndRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = async () => {
  if (!question.trim() && !selectedFile) return;

  const formData = new FormData();
  if (selectedFile) formData.append('image', selectedFile);
  if (question.trim()) formData.append('question', question.trim());

  try {
    const res = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('서버 응답 오류');
    }

    const data = await res.json();

    setChatHistory((prev) => [
      ...prev,
      {
        userQuestion: question,
        userImage: selectedFile ? URL.createObjectURL(selectedFile) : null,
        botAnswer: data.answer || '응답이 없습니다.',
        botImage: data.image_url || null,
      },
    ]);
  } catch (error) {
    console.error('❌ 전송 실패:', error);
    alert('서버에서 응답을 받지 못했습니다.');
  }

  setQuestion('');
  setSelectedFile(null);
  setImageName('');
};


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {chatHistory.map((chat, idx) => (
          <div key={idx} className="space-y-2">
          {/* 사용자 메시지 (오른쪽) */}
          <div className="flex justify-end items-start gap-2">
            <div className="flex flex-col items-end gap-1 max-w-[70%]">
              {chat.userImage && (
                <img
                  src={chat.userImage}
                  alt="uploaded"
                  className="w-40 h-auto rounded-xl border"
                />
              )}
              {chat.userQuestion && (
                <div className="bg-green-400 text-white px-4 py-2 rounded-2xl rounded-br-sm text-sm shadow">
                  {chat.userQuestion}
                </div>
              )}
            </div>
          </div>

            {/* 챗봇 메시지 (왼쪽) */}
            <div className="flex justify-start items-start gap-2">
              <img
                src="/RESORT1.png"
                alt="bot"
                className="w-8 h-8 object-cover rounded-full border"
              />
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm text-sm shadow">
                  {chat.botAnswer}
                </div>
              </div>
            </div>

        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 사진 미리보기 */}
      {selectedFile && (
        <div className="px-4 pt-2 pb-0 bg-white border-t flex justify-start">
          <div className="relative w-32">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              className="rounded-lg border w-full h-auto"
            />
            <button
              onClick={() => setSelectedFile(null)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 하단 입력창 */}
      <div className="p-4 border-t bg-white flex items-center gap-2">
        {/* 이미지 업로드 */}
        <label className="cursor-pointer text-gray-600 hover:text-green-500">
          <FaImage size={20} />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedFile(file);
                setImageName(file.name);
              }
            }}
          />
        </label>

        {/* 질문 입력 */}
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="메시지를 입력하세요"
          className="flex-1 resize-none border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* 보내기 버튼 */}
        <button
          onClick={handleSend}
          className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-xl"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
