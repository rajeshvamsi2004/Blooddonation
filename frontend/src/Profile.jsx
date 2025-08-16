import React, { useState, useEffect } from 'react';
import {
  MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody,
  MDBCardImage, MDBTypography, MDBIcon
} from 'mdb-react-ui-kit';

export default function Profile() {
  const e = JSON.parse(localStorage.getItem('donor'));
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      localStorage.setItem('profileImage', base64String);
      setProfileImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (!e) {
    return (
      <MDBContainer className="py-5 text-center">
        <h3>No donor data found</h3>
        <p>Please log in or register a donor profile.</p>
      </MDBContainer>
    );
  }

  return (
    <section id='profile' className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer id='profile1' className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard id='profile3' className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol id='profileimage' md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage
                    id='profile-image-display'
                    src={profileImage || ""}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: '80px', borderRadius: '50%' }}
                    fluid />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="fileInput"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="fileInput">
                    <MDBIcon far icon="edit mb-5" style={{ cursor: 'pointer' }} />
                  </label>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{e.Name}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Age</MDBTypography>
                        <MDBCardText className="text-muted">{e.Age}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Blood</MDBTypography>
                        <MDBCardText className="text-muted">{e.Blood}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{e.Email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">PhoneNumber</MDBTypography>
                        <MDBCardText className="text-muted">{e.PhoneNumber}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}