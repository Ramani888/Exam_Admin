import React, { useEffect, useRef, useState } from 'react'
import { ButtonContainer, DeleteImgButton, Form, ImageUploadButton, ImageUploadButtonContainer, NewCandidatesBodyContainer, NewCandidatesBodyRow, NewCandidatesContainer, NewCandidatesHeaderContainer, SelectedImage, SelectedImageContainer, VisuallyHiddenInput, WebcamContainer } from './NewCandidates.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import useNewCandidates from './useNewCandidates';
import { Formik } from "formik";
import AppInput from '../../../components/AppInput/AppInput';
import {
  Button, Box, CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import { uploadBase64SingleImage, uploadSingleImage } from '../../../utils/helpers/global';

interface ImageHandlerProps {
  onImageSelect: (src: string) => void;
}

const WebcamCapture: React.FC<ImageHandlerProps> = ({ onImageSelect }) => {
  const webcamRef = useRef<Webcam>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };
    loadModels();
  }, []);

  const capture = async () => {
    if (webcamRef.current) {
      setLoading(true)
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const detections = await detectFaces(imageSrc);
        if (detections.length === 1) {
          onImageSelect(imageSrc);
          setLoading(false);
        } else {
          setLoading(false);
          alert('Please make sure only one face is in the picture');
        }
      }
      setLoading(false);
    }
  };

  const detectFaces = async (imageSrc: string) => {
    const img = await faceapi.fetchImage(imageSrc);
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
    return detections;
  };

  return (
    <WebcamContainer>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{borderRadius: '7px', height: '250px', width: '250px'}}
      />
      {/* <button onClick={capture}>Capture Photo</button> */}
      <LoadingButton
        loading={loading}
        loadingPosition='start'
        variant='contained' 
        onClick={capture} 
        startIcon={<CameraAltIcon />}
      >
        Click
      </LoadingButton>
    </WebcamContainer>
  );
};


const ImageUpload: React.FC<ImageHandlerProps> = ({ onImageSelect }) => {

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };
    loadModels();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataURL = reader.result as string;

        const detections = await detectFaces(dataURL);
        if (detections.length === 1) {
          onImageSelect(dataURL);
        } else {
          alert('Please make sure only one face is in the picture');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const detectFaces = async (imageSrc: string) => {
    const img = await faceapi.fetchImage(imageSrc);
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
    return detections;
  };

  return (
    <Button
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={<CloudUploadIcon />}
    >
    Upload file
    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
    </Button>
  );
};

const NewCandidates = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/candidates/candidate-data');
  }
  const {
    batchData,
    handleClose,
    schema,
    handleSubmit,
    handleUpdate,
    loading
  } = useNewCandidates();
  const location = useLocation();
  const editData = location.state;

  const [imageSrc, setImageSrc] = useState<string | null>(editData ? editData?.profileImg : null);
  const [mode, setMode] = useState<'capture' | 'upload' | null>(null);

  const handleImageSelect = async (src: string) => {
    setImageSrc(src);
    setMode(null);
  };

  return (
    <NewCandidatesContainer>
      <NewCandidatesHeaderContainer>
        <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
      </NewCandidatesHeaderContainer>
      <NewCandidatesBodyContainer>
        <Formik
          validationSchema={schema}
          initialValues={{
            batchId: editData ? editData?.batchId : '',
            rollNumber: editData ? editData?.rollNumber : '',
            firstName: editData ? editData?.firstName : '',
            middleName: editData ? editData?.middleName : '',
            lastName: editData ? editData?.lastName : '',
            email: editData ? editData?.email : '',
            number: editData ? editData?.number : '',
          }}
          onSubmit={(values) => {
            if (editData) {
              handleUpdate({...values, _id: editData?._id, imageSrc: imageSrc, deleteProfileImg: editData?.profileImg})
            } else {
              handleSubmit({...values, imageSrc: imageSrc})
            }
          }}
        >
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isValidating,
          isSubmitting    
          }) => (
            <Form onSubmit={handleSubmit}>
              <NewCandidatesBodyRow>
                <AppDropDown
                  data={batchData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                      handleChange(e);
                  }} 
                  value={values?.batchId}
                  name={'batchId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Batch'}
                  minWidth={'300px'}
                  isRequired
                />
                <AppInput
                  label='Roll Number' 
                  name='rollNumber' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.rollNumber} 
                  placeholder={'Roll Number'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </NewCandidatesBodyRow>
              <NewCandidatesBodyRow>
                <AppInput
                  label='First Name' 
                  name='firstName' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.firstName} 
                  placeholder={'First Name'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label='Middle Name' 
                  name='middleName' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.middleName} 
                  placeholder={'Middle Name'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label='Last Name' 
                  name='lastName' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.lastName} 
                  placeholder={'Last Name'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </NewCandidatesBodyRow>
              <NewCandidatesBodyRow>
                <AppInput
                  label='Email' 
                  name='email' 
                  type='email' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.email} 
                  placeholder={'Email ID'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label='Mobile Number' 
                  name='number' 
                  type='number' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.number} 
                  placeholder={'Mobile No'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </NewCandidatesBodyRow>

              {imageSrc ? (
                <SelectedImageContainer>
                  <SelectedImage src={imageSrc} />
                  <DeleteImgButton onClick={() => setImageSrc(null)}>
                    <DeleteIcon color='error' />
                  </DeleteImgButton>
                </SelectedImageContainer>
              ) : (
                <>
                  {/* <h1>Profile Picture Capture and Upload</h1> */}
                  <ImageUploadButtonContainer>
                    <Button variant='contained' onClick={() => setMode('capture')} startIcon={<ImageIcon />}>
                      Capture Image
                    </Button>
                    <Button variant='contained' onClick={() => setMode('upload')} startIcon={<ImageIcon />}>
                      Upload Image
                    </Button>
                  </ImageUploadButtonContainer>
                  {mode === 'capture' && <WebcamCapture onImageSelect={handleImageSelect} />}
                  {mode === 'upload' && <ImageUpload onImageSelect={handleImageSelect} />}
                </>
              )}    

              <ButtonContainer>
                <Button onClick={() => handleClose()} variant="contained" color={'error'}>Cancel</Button>
                <Box sx={{ m: 1, position: 'relative' }}>
                    {/* <Button variant="contained" type='submit' color={'success'} disabled={!imageSrc}>Submit</Button> */}
                    <LoadingButton
                      loading={loading}
                      loadingPosition='center'
                      variant='contained'
                      disabled={!imageSrc}
                      color={'success'}
                      type='submit'
                    >
                      Submit
                    </LoadingButton>
                    {false && (
                    <CircularProgress
                        size={24}
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}
                    />
                    )}
                </Box>
              </ButtonContainer>
            </Form>
            )}
        </Formik>
      </NewCandidatesBodyContainer>
    </NewCandidatesContainer>
  )
}

export default NewCandidates