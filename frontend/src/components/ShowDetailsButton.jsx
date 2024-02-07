/* eslint-disable react/prop-types */
import { Button, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const ShowDetailsButton = ({ onClick, tooltip, loading }) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={onClick}
        type="primary"
        style={{ minWidth: 50, backgroundColor: "#f5bb3d" }}
        loading={loading}
      >
        <InfoCircleOutlined />
      </Button>
    </Tooltip>
  );
};

export default ShowDetailsButton;
