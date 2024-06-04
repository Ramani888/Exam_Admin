import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DropDownLabelAndErrorContainer, TextLabel, TextLabelSpan } from './TextEditor.styled';

interface Props {
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    value: string;
    name: string;
    errors: any;
    touched: any;
    label: string;
    isRequired?: boolean;
}

const TextEditor: React.FC<Props> = ({ handleChange, handleBlur, value, name, errors, touched, label, isRequired }) => {
    return (
        <div className="text-editor">
            <DropDownLabelAndErrorContainer>
                <TextLabel>{label} <TextLabelSpan>{isRequired ? '*' : ''}</TextLabelSpan></TextLabel>
                <div style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
                {errors[name] && touched[name] && errors[name]}
                </div>
            </DropDownLabelAndErrorContainer>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    handleChange({ target: { name: name, value: data } });
                }}
                onBlur={(event: any, editor: any) => {
                    handleBlur({ target: { name: name } });
                }}
                config={{
                    toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                        'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'
                    ],
                    table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                    },
                    mediaEmbed: {
                        previewsInData: true
                    }
                }}
            />
        </div>
    );
};

export default TextEditor;
