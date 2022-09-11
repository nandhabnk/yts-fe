import React, { useState } from "react";
import { tableHeadings } from "../../consts/channelSearchConst";
import channelSearchMock from "../../mocks/scrappedDataMock.json";
import { Table } from "antd";
import CommentsModal from "./CommentsModal";
import "./channelSearch.scss";

const ChannelSearch = () => {
  const [openComments, setOpenComments] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const tableColumns = tableHeadings.map((heading: string) => {
    const headingText = heading.toLowerCase();
    let headingObj = {
      title: heading,
      dataIndex: headingText,
      key: headingText,
    };
    if (heading === "Thumbnail") headingObj.dataIndex = "thumbnail_url";

    if (heading === "Comments") headingObj.dataIndex = "id";

    switch (heading) {
      case "Thumbnail":
        Object.assign(headingObj, {
          render: (text: string) => <img src={text} alt={text} />,
        });
        break;
      case "Published_date":
        Object.assign(headingObj, {
          render: (text: string) => (
            <span>{new Date(text).toDateString()} </span>
          ),
        });
        break;
      case "Comments":
        Object.assign(headingObj, {
          render: (text: string) => <a onClick={openCommentsModal}>{text}</a>,
        });
        break;
      case "Video_link":
        Object.assign(headingObj, {
          render: (text: string) => (
            <a href={text} target="_blank">
              VIDEO LINK
            </a>
          ),
        });
        break;

      case "Video_status":
        Object.assign(headingObj, {
          render: (text: string | Number) => (
            <span>
              {text === 0
                ? "Downloading"
                : text === -1
                ? "Not yet downloaded"
                : "Download completed"}
            </span>
          ),
        });
        break;
    }
    console.log(headingObj);
    return headingObj;
  });

  const openCommentsModal = () => {
    setOpenComments(true);
  };

  const closeCommentsModal = () => {
    setOpenComments(false);
  };

  const confirmLoadingStatus = (status: boolean) => {
    setConfirmLoading(status);
  };

  const { data } = channelSearchMock;

  return (
    <React.Fragment>
      <div className="channelSearchContainer">
        <div className="channelSearchTable">
          <Table
            columns={tableColumns}
            dataSource={data}
            pagination={false}
            bordered
            title={() => "Channel search results"}
          />
        </div>
        <CommentsModal
          open={openComments}
          confirmLoading={confirmLoading}
          handleOkCancel={closeCommentsModal}
        />
      </div>
    </React.Fragment>
  );
};
export default ChannelSearch;
