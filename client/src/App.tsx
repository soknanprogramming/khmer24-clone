import TopBar from "./components/TopBar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SubCategoryPage from "./pages/SubCategoryPage"
import useCategories from "./store/useCategories"
import BrandCategoryPage from "./pages/BrandCategoryPage"
import { useEffect } from "react"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import AuthPage from "./pages/AuthPage"
import PostPage from "./pages/PostPage"
import MyAdsPage from "./pages/MyAdsPage"
import AdDetailPage from "./pages/AdDetailPage" // <-- Import the new page
import Settings from "./components/Settings"

const App = () => {
  const { fetchCategories, categories } = useCategories();
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debugging categories
    useEffect(() => {
      console.log(categories);
    }, [categories]);
  // end of debugging categories
  
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/post" element={<PostPage/>}/>
        <Route path="/my-ads" element={<MyAdsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ad/:adId" element={<AdDetailPage />} /> {/* <-- Add the new route */}
        <Route path="/:subCategoriesName" element={<SubCategoryPage/>}/>
        <Route path="/:subCategoriesName/:brandName" element={<BrandCategoryPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App