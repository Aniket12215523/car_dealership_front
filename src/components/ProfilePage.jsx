import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from './useAuth';
import VideoBackground from './VideoBackground';
import './ProfilePage.css';

function ProfilePage() {
  const { currentUser, checking } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: '',
    location: '',
    timezone: '',
    language: '',
    gender: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (checking) return;

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token && !currentUser) {
        navigate('/login');
        return;
      }

      if (!token && currentUser) {
        setUserData({
          name: currentUser.displayName,
          email: currentUser.email,
          profileImage: currentUser.photoURL,
          phone: '',
          location: '',
          timezone: '',
          language: '',
          gender: ''
        });
        setPreviewImage(currentUser.photoURL);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
        setPreviewImage(
          res.data.profileImage
            ? (res.data.profileImage.startsWith('http') ? res.data.profileImage : `${import.meta.env.VITE_API_URL}${res.data.profileImage}`)
            : ''
        );
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate, currentUser, checking]);

  const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone || '');
      formData.append('location', userData.location || '');
      formData.append('timezone', userData.timezone || '');
      formData.append('language', userData.language || '');
      formData.append('gender', userData.gender || '');
      if (selectedImage) formData.append('image', selectedImage);

      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data'
        }
      });

      setUserData(res.data);
      setPreviewImage(
        res.data.profileImage
          ? (res.data.profileImage.startsWith('http') ? res.data.profileImage : `${import.meta.env.VITE_API_URL}${res.data.profileImage}`)
          : ''
      );
      setSelectedImage(null);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  if (checking) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container"> 
      <VideoBackground />

      <motion.div
        className="profile-card"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Your Profile</h2>

        <div className="profile-image-section">
          <div className="image-preview">
            {previewImage ? (
              <img src={previewImage} alt="Profile Preview" />
            ) : (
              <div className="avatar-placeholder">
                {userData.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div className="image-options">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <button
              type="button"
              className="upload-btn"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </button>
            <button
              type="button"
              className="google-btn"
              onClick={() => alert('Google Drive integration would go here')}
            >
              From Drive
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={userData.name || ''} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={userData.email} readOnly className="read-only" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={userData.phone || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={userData.location || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select name="timezone" value={userData.timezone || ''} onChange={handleChange}>
              <option value="">Select Timezone</option>
              <option value="GMT">GMT</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="IST">IST</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select name="language" value={userData.language || ''} onChange={handleChange}>
              <option value="">Select Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={userData.gender || ''} onChange={handleChange}>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
          </div>

          <button type="submit" className="save-btn">Save Profile</button>
        </form>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
