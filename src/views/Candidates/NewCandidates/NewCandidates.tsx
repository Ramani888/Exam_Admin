import React, { useEffect, useRef, useState } from 'react';
import { ButtonContainer, DeleteImgButton, Form, ImageUploadButton, ImageUploadButtonContainer, NewCandidatesBodyContainer, NewCandidatesBodyRow, NewCandidatesContainer, NewCandidatesHeaderContainer, SelectedImage, SelectedImageContainer, VisuallyHiddenInput, WebcamContainer } from './NewCandidates.styled';
import AddHeader from '../../../components/AddHeader/AddHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import useNewCandidates from './useNewCandidates';
import { Formik } from "formik";
import AppInput from '../../../components/AppInput/AppInput';
import {
  Button, Box, CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';

interface ImageHandlerProps {
  onImageSelect: (src: string) => void;
}

const WebcamCapture: React.FC<ImageHandlerProps> = ({ onImageSelect }) => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [faceDetected, setFaceDetected] = useState<boolean>(false); // Store face detection result

  useEffect(() => {
    const faceDetection = new FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
    });

    faceDetection.setOptions({
      model: 'short',
      minDetectionConfidence: 0.5,
    });

    faceDetection.onResults((results) => {
      if (results.detections.length > 0) {
        setFaceDetected(true); // Update state when a face is detected
      } else {
        setFaceDetected(false); // No face detected
      }
    });

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current, {
        onFrame: async () => {
          if (webcamRef.current) {
            await faceDetection.send({ image: webcamRef.current });
          }
        },
        width: 1280,
        height: 720,
      });
      camera.start();
      setModelsLoaded(true);
    }
  }, []);

  const capture = () => {
    if (!modelsLoaded) {
      alert('Models are not yet loaded. Please wait a moment and try again.');
      return;
    }

    if (!faceDetected) {
      alert('No face detected. Please ensure your face is visible in the webcam.');
      return;
    }

    if (webcamRef.current) {
      setLoading(true);
      const canvas = document.createElement('canvas');
      canvas.width = webcamRef.current.videoWidth;
      canvas.height = webcamRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg');
        onImageSelect(imageSrc);
      }
      setLoading(false);
    }
  };

  return (
    <WebcamContainer>
      <video
        ref={webcamRef}
        style={{ borderRadius: '7px', height: '250px', width: '250px' }}
        autoPlay
        muted
        playsInline
      />
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        variant="contained"
        onClick={capture}
        startIcon={<CameraAltIcon />}
      >
        Capture Image
      </LoadingButton>
    </WebcamContainer>
  );
};


const ImageUpload: React.FC<ImageHandlerProps> = ({ onImageSelect }) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    // The FaceDetection library does not require explicit model loading, so we just set the state to true
    setModelsLoaded(true);
    console.log('FaceDetection library initialized');
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && modelsLoaded) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataURL = reader.result as string;

        try {
          const detections = await detectFaces(dataURL);
          if (detections.length === 1) {
            onImageSelect(dataURL);
          } else if (detections.length === 0) {
            alert('No face detected in the image. Please upload an image with a visible face.');
          } else {
            alert('Multiple faces detected. Please make sure only one face is in the picture.');
          }
        } catch (error) {
          console.error('Error during face detection:', error);
          alert('An error occurred while detecting faces. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    } else if (!modelsLoaded) {
      alert('Face detection is not yet initialized. Please wait a moment and try again.');
    }
  };

  const detectFaces = async (imageSrc: string): Promise<any[]> => {
    const img = new Image();
    img.src = imageSrc;

    return new Promise<any[]>((resolve, reject) => {
      img.onload = async () => {
        try {
          const faceDetection = new FaceDetection({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
          });

          faceDetection.setOptions({
            model: 'short', // or 'full' for a more detailed model
            minDetectionConfidence: 0.5,
          });

          faceDetection.onResults((results: { detections: any[] }) => {
            if (results.detections && results.detections.length > 0) {
              resolve(results.detections);
            } else {
              resolve([]); // No faces detected
            }
          });

          // Create a canvas to send the image to FaceDetection
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            await faceDetection.send({ image: canvas });
          }
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = (error) => reject(error);
    });
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
  };
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
              handleUpdate({ ...values, _id: editData?._id, imageSrc: imageSrc, deleteProfileImg: editData?.profileImg });
            } else {
              handleSubmit({ ...values, imageSrc: imageSrc });
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

export default NewCandidates;
