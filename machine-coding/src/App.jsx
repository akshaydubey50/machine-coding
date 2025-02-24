import SearchList from './components/SearchList'
import Calendra from './components/Calendra'
import MyCalendar from './components/MyCalendar'
import Autocomplete from './components/Autocomplete'
import Chatbot from './components/Chatbot'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import DragDropBoard from './components/DragDropBoard'
import InfiniteScroll from './components/InfiniteScroll'
import StarRating from './components/StarRating'
import MeetingCalendar from './components/MeetingCalendar'
import VirtualizedList from './components/VirtualizedList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeContextProvider } from './context/useThemeContext'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import TodoList from './components/TodoList'
import CountDownTimer from './components/CountDownTimer'
import OtpValidator from './components/OtpValidator'


function App() {
  const LIST = Array.from({ length: 10000 }, (_, index) => (
    index + 1
  ))
  return (
    <>
      {/* <MyCalendar /> */}
      {/* <SearchList /> */}
      {/* <Autocomplete /> */}
      {/* <Chatbot /> */}
      {/* <Sidebar /> */}
      {/* <Toast /> */}
      {/* <DragDropBoard /> */}
      {/* <InfiniteScroll /> */}
      {/* <StarRating maxStar={5} filledStar={0}/> */}
      {/* <MeetingCalendar /> */}
      {/* <VirtualizedList height={400} width={300} itemHeight={35} LIST={LIST} /> */}
      {/* <ThemeContextProvider>
      <div className="min-h-screen flex flex-col space-y-6 items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='contact/' element={<Contact />} />
          </Routes>
        </BrowserRouter>
        </div>
      </ThemeContextProvider> */}
      {/* <TodoList /> */}
        {/* <CountDownTimer /> */}
        <OtpValidator />
    </>
  )
}

export default App
