import React, { useRef } from 'react'
import { AppFileInputBoxContainer, AppFileInputBoxImage, AppFileInputContainer } from './AppFileInput.styled'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { isUrlString } from '../../utils/helpers/global';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    name: string;
    accept: string;
    handleChange: (e: any) => void;
    value: any;
    isVideo?: boolean;
    handleRemove: () => void;
}

const AppFileInput: React.FC<Props> = ({ name, accept, handleChange, value, isVideo, handleRemove }) => {
    const fileRef: any = useRef(null);

    const handleClick = () => {
        fileRef.current.click();
    };
  return (
    <AppFileInputContainer>
        <AppFileInputBoxContainer isValue={value ? false : true} >
            {(value && !isVideo) && (
                <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                    <div style={{ position: 'absolute', top: 10, right: 10, background: '#f6c6c5', height: 30, width: 30, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleRemove()}>
                        <DeleteIcon sx={{ color: '#ad0201' }}/>
                    </div>
                    <img height={'100%'} width={'100%'} style={{ borderRadius: 7 }} onClick={handleClick} src={isUrlString(value) ? value : URL.createObjectURL(value)}></img>
                </div>
            )}

            {(isVideo && value) && (
                <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                    <div style={{ position: 'absolute', top: 25, right: 10, background: '#f6c6c5', height: 30, width: 30, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1 }} onClick={() => handleRemove()}>
                        <DeleteIcon sx={{ color: '#ad0201' }}/>
                    </div>
                    <video height={'100%'} width={'100%'} style={{ borderRadius: 7 }} onClick={handleClick} controls src={isUrlString(value) ? value : URL.createObjectURL(value)}></video>
                </div>

            )}

            {(!value) && (
                <AppFileInputBoxImage onClick={handleClick}>
                    <ControlPointIcon sx={{height: 50, width: 50, opacity: 0.5}}/>
                </AppFileInputBoxImage>
            )}
        </AppFileInputBoxContainer>
        <input
            name={name}
            type="file"
            ref={fileRef}
            style={{display:'none'}}
            onChange={handleChange}
            accept={accept}
        />
    </AppFileInputContainer>
  )
}

export default AppFileInput