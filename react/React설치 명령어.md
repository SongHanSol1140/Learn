# 설치명령어 
npx create-react-app . --template typescript


# react-router-dom (URL라우팅)
npm i react-router-dom
```javascript
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from 'react-router-dom';
      <Router basename="/Kiosk">
        {/* 최상단 네비 버튼 */}
        <nav style={{ padding: 16 }}>
          {/* 이 버튼이 사용자 입력으로 간주되어, 이동 후 VideoTest 에서 autoPlay 음소거 해제 가능 */}
          <Link to="/VideoTest">
            <button>▶️ 동영상 바로 보기</button>
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/VideoTest" element={<VideoTest />} />
          <Route element={<WebSocketLayout />}>
            <Route path="/MicTest" element={<MicTest2 />} />
          </Route>
        </Routes>
      </Router>
```

# 컴포넌트 감싸기

npm i react-router-dom
```javascript
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from 'react-router-dom';

const OutletLayout: React.FC = () => (
  <ComponentProvider>
    <Outlet />
  </ComponentProvider>
);
// 실제사용
      <Route element={<OutletLayout />}>
            <Route path="/MicTest" element={<MicTest2 />} />
          </Route>

```
이러면 ComponentProvider가 무조건먼저 출력후에 MicTest2가 나옴