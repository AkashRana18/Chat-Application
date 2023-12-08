import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite';
import { useModelState } from '../../../misc/custom-hooks';
import { useState } from 'react';
import { storage } from '../../../misc/firebase';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const AttachmentBtnModal = ({ afterUpload }) => {
  const { isOpen, open, close } = useModelState();

  const { chatId } = useParams();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = fileArr => {
    const filtered = fileArr
      .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };

  const onUpload = async () => {
    try {
      const uploadPromises = fileList.map(f => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
      });

      const uploadSnapshots = await Promise.all(uploadPromises);

      const shapePromises = uploadSnapshots.map(async snap => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);
      setIsLoading(false);

      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Uploader
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
            className="w-100"
            disabled={isLoading}
          >
            <div className="text-center mt-5">
              <Icon icon="avatar" size="5x" />
              <h6 className="mt-2">Drag and drop files here</h6>
            </div>
          </Uploader>
        </Modal.Body>

        <Modal.Footer>
          <Button block disabled={isLoading} onClick={onUpload}>
            Send to chat
          </Button>
          <div className="text-right mt-2">
            <small className="text-muted">
              * Only files less than 5MB are allowed
            </small>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AttachmentBtnModal;
