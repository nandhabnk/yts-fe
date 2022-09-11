import React, { useState } from "react";

import CommentsMock from '../../../mocks/commentsMock.json'
import { Modal } from "antd";

const CommentsModal = (props:any) => {

  return (
    <>
      <Modal
        title="Comments for ####"
        footer=""
        centered
        width={1000}
        open={props.open}
        confirmLoading={props.confirmLoading}
        onCancel={props.handleOkCancel}
      >
        <p>Modal TEXT</p>
      </Modal>
    </>
  );
};

export default CommentsModal;
