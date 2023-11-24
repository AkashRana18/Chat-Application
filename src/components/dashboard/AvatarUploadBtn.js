import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { useState } from 'react';

const fileInputTypes = '.png, .jpeg, .jpg';

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);

  const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
  const isValidFile = file => acceptedFileTypes.includes(file.type);

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;
    const file = currFiles[0];
    if (isValidFile(file)) {
      setImg(file);
      open();
    } else {
      Alert.warning(`Wrong file type ${File.type}`, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex justify-center align-items-center h-100' >

            <AvatarEditor
              image={img}
              width={250}
              height={250}
              border={10}
              borderRadius={100}
              rotate={0}
              />
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
