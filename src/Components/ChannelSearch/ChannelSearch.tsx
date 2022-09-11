import React, { useState } from "react";
import { tableHeadings } from "../../consts/channelSearchConst";
import { Table } from "antd";
import CommentsModal from "./CommentsModal";
import "./channelSearch.scss";

const ChannelSearch = (props: any) => {
  const [openComments, setOpenComments] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

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
          render: (text: string) => (
            <a onClick={() => openCommentsModal(text)}>{text}</a>
          ),
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
    return headingObj;
  });

  const openCommentsModal = async (id: any) => {
    const response = await fetch(
      `http://137.184.202.24:8000/queue/data?data=comment&id=${id}`
    );
    if (response.ok) {
      const resData = await response.json();
      setCommentsData(resData.data);
      setOpenComments(true);
    }
  };

  const closeCommentsModal = () => {
    setCommentsData([]);
    setOpenComments(false);
  };

  return (
    <React.Fragment>
      <div className="channelSearchContainer">
        <div className="channelSearchTable">
          <Table
            columns={tableColumns}
            dataSource={props.tableData}
            pagination={false}
            bordered
            title={() => "Channel search results"}
          />
        </div>
        <CommentsModal
          open={openComments}
          handleOkCancel={closeCommentsModal}
          commentsData={commentsData}
        />
      </div>
    </React.Fragment>
  );
};
export default ChannelSearch;
