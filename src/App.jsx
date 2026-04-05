import { useState, useEffect } from 'react'
import GeneralInfo from './components/GeneralInfo';
import Profile from "./components/Profile";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";

import Icon from '@mdi/react';
import { mdiRestart, mdiPrinter,  mdiEye, mdiFileEdit, mdiPhone, mdiEmail, mdiWeb, mdiGithub, mdiMapMarker, mdiTrashCan } from '@mdi/js';

import './css/index.css'

const LOCAL_STORAGE_KEY = 'cv_builder_data';
const DEFAULT_CV_DATA = {
  firstName: "Gagaa",
  lastName: "Chu",
  middleInitial: "C.",
  jobTitle: "Web Developer",
  phone: "+886 123 456 789",
  email: "gagaa@gmail.com",
  github: "github.com/gagaa03",
  website: "gagaa.com",
  location: "Taipei, Taiwan",
  profile: "On the way of learning Web develope...",
  experience: [
    { company: "TSMC", startDate: "2022-10-15", endDate: "2023-10-15", position: "Human Resource assistant", description: "recruitment, compensation..." }
  ],
  education: [
    { school: "The Odin Project", startDate: "2025-02-01", endDate: "", degree: "Student", major: "Full Stack WebDesigner", description: "keep learning..." }
  ],
  skills: {
    "Frontend": ["HTML", "CSS", "JavaScript", "React"],
    "Design": ["Premiere", "Photography"],
    "Tools": ["Git", "Vite"]
  },
  photo: ""
};

function App() {

  // 預設
  const [cvData, setCvData] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }

    return DEFAULT_CV_DATA;

  });


  // 照片檔案過大警示
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvData));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert("照片檔案太大！重新載入將不儲存照片");
      }
      console.error("LocalStorage Save Error:", e);
    }
  }, [cvData]);

  // Reload CV
  const loadExample = () => {
    if (window.confirm("Load example data? Current progress will be overwritten.")) {
      setCvData(DEFAULT_CV_DATA);
    }
  };


  const [previewVisible, setPreviewVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(0.8);  // 預覽預設值

   // 響應式切換
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const mobile = window.innerWidth <= 1120;

      if (mobile) {
        // (螢幕寬度 - 左右間距) / A4寬度
        const padding = 30;
        const availableWidth = screenWidth - padding;
        const autoScale = availableWidth / 794; 
        
        const maxLimit = screenWidth > 700 ? 0.90 : 0.75;
        const finalScale = Math.min(autoScale, maxLimit);

        setScale(finalScale);
      } else {
        setScale(0.8);
      }

      // 大螢幕顯示預覽，小螢幕預設隱藏
      setIsMobile(prevMobile => {
        // 如果從「手機版」變回「電腦版」
        if (prevMobile === true && mobile === false) {
          setPreviewVisible(true); // 強制顯示預覽區
        }
        // 如果從「電腦版」變成「手機版」
        if (prevMobile === false && mobile === true) {
          setPreviewVisible(false); // 預設隱藏預覽區（顯示編輯區）
        }
        return mobile;
      });
    };

    handleResize(); // 初始執行一次
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearCV = () => {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setCvData({
        firstName: "",
        lastName: "",
        middleInitial: "",
        jobTitle: "",
        phone: "",
        email: "",
        github: "",
        website: "",
        location: "",
        profile: "",
        experience: [],
        education: [],
        skills: {},
        photo: ""
      });
    }
  };

  // print
  const printCV = () => {
    window.print();
  };


  // 上傳照片
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData({ ...cvData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setCvData(prevData => ({ 
      ...prevData, 
      photo: "" 
    }));
  };

  const togglePreview = () => setPreviewVisible(!previewVisible);

  const formatDate = (date) => {
    if (!date) return "Present";
    const d = new Date(date);
    return d.toLocaleString('en-US', {month: 'short', year: 'numeric' });
  }


  return (
      <>
        <div className={`editor ${(!isMobile || !previewVisible) ? "show" : "hide"}`}>
          <header className='app-header'>
            <h1>Make Your CV</h1>
            <p>fast and effortless</p>            
          </header>

          <div className='uploadImage'>
            <label>
              <span>Upload Photo： </span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </label>
            
            {/* 如果有照片，顯示移除按鈕 */}
            {cvData.photo && (
              <button 
                type="button" 
                className="remove-photo-inline" 
                onClick={handleRemovePhoto}
                title="Remove current photo"
              >
                <Icon path={mdiTrashCan} size={0.7} />
              </button>
            )}
          </div>
          
          <GeneralInfo  data={cvData} setData={setCvData}  />
          <Profile  data={cvData} setData={setCvData}  />
          <Experience  data={cvData} setData={setCvData}  />
          <Education  data={cvData} setData={setCvData}  />
          <Skills  data={cvData} setData={setCvData}  />
          <p className='footer'>© 2025 - Designed and developed by Ruby Chu</p>
        </div>

        {/* 預覽區 */}
        <div className={`preview-container ${(!isMobile || previewVisible) ? "show" : "hide"}`} style={{ '--preview-scale': scale }}>
          <div className="preview">
            <div className='resume' style={{ transform: `scale(${scale})` }}>
          
              <div className='resume-header'>
                <div className='selfimage'>
                  {cvData.photo && <img src={cvData.photo} alt="Profile" />}
                </div>
                <div className='name-job'>
                  <h1 className='full-Name'>{cvData.firstName} {cvData.middleInitial} {cvData.lastName}</h1>
                  <h2 className='job'>{cvData.jobTitle}</h2>
                </div>              
              </div>
              
              <div className='resume-body'>
                <div className='sideBar'>
                  <section className='contact'>
                    <h3>CONTACT</h3>
                    <div className='contact-list'>
                      <p><Icon path={mdiPhone} size={0.5} />  {cvData.phone}</p>
                      <p><Icon path={mdiEmail} size={0.5} />{cvData.email}</p>
                      <p><Icon path={mdiWeb} size={0.5} />{cvData.website}</p>
                      <p><Icon path={mdiGithub} size={0.5} />{cvData.github}</p>
                      <p><Icon path={mdiMapMarker} size={0.5} />{cvData.location}</p>
                    </div>
                    
                  </section>

                  <section className='resume-skills'>
                    <h3>SKILLS</h3>
                    {Object.entries(cvData.skills).map(([category, skills]) => (
                      <div key={category} className="skill-group">
                        <h4 className="skill-category-title">{category}</h4>
                        <div className='skills-container'>
                          {skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                </div>


                <div className='main-content'>
                  <section className='resume-profile'>
                    <h3 className='resume-heading'>PROFILE</h3>
                    <p>{cvData.profile}</p>
                  </section>

                  <section className='resume-experience'>
                    <h3 className='resume-heading'>WORK EXPERIENCE</h3>
                    {cvData.experience.map((exp, i) => (
                      <div key={i} className='experience-item'>
                        <div className='company'>
                          <strong>{exp.company}</strong>
                        </div>
                        <div className='date'>
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}  
                        </div>                                       
                        <div className='position'>{exp.position}</div>
                        <div className='description'>{exp.description}</div>
                      </div>
                    ))}
                  </section>

                  <section className='resume-education'>
                    <h3 className='resume-heading'>EDUCATION</h3>
                    {cvData.education.map((edu, i) => (
                      <div key={i} className='education-item'>
                        <div className='school'>
                          <strong>{edu.school}</strong>
                          <div className='degree'>{edu.degree}</div>
                        </div>
                        <div className='date'>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate) || "Present"}
                        </div>
                        <div className='major'>{edu.major}</div>
                        <div className='description'>{edu.description}</div>
                      </div>
                    ))}
                  </section>
                </div>
              </div>            
            </div>
          </div>
          <div className='preview-size'>A4 preview</div>
        </div>
            
        

        {/* 工具列 */}
        <div className="cv-tools">
          {isMobile && (
            <button  className="toggle-preview" onClick={togglePreview}>
              {previewVisible ? <Icon title='edit' path={mdiFileEdit} size={1} /> : <Icon title='preview' path={mdiEye} size={1} />}
            </button>
          )}
          <button title="reload example" onClick={loadExample}><Icon path={mdiRestart} size={1}/></button>
          <button title='clear' onClick={clearCV}><Icon path={mdiTrashCan} size={1} /></button>
          <button title='print' onClick={printCV}><Icon path={mdiPrinter} size={1} /></button>
        </div>
      </>
  )
}

export default App;