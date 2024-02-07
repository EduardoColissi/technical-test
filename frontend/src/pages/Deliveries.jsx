import { SearchOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { cpfMask, removeCpfMask } from "../utils/functions";
import { api } from "../services/api";

import ShowDetailsButton from "../components/ShowDetailsButton";
import Template from "../template/Template";
import CustomTable from "../components/CustomTable/CustomTable";

const { Title } = Typography;

const Deliveries = () => {
  const [data, setData] = useState([]);
  const [searchCpf, setSearchCpf] = useState("");

  const navigate = useNavigate();

  const columns = [
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <span>ID</span>
        </div>
      ),
      key: "id",
      width: 300,
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{text.id}</span>
        </div>
      ),
    },
    {
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{text.volumes}</span>
        </div>
      ),
      width: 100,
      title: (
        <div style={{ textAlign: "center" }}>
          <span>Volumes</span>
        </div>
      ),
      key: "volumes",
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <span>Remetente</span>
        </div>
      ),
      key: "nome_remetente",
      width: 250,
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{text.nome_remetente}</span>
        </div>
      ),
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <span>Destinatário</span>
        </div>
      ),
      key: "destinatario",
      width: 250,
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{text.destinatario.nome}</span>
        </div>
      ),
    },
    {
      title: (
        <div style={{ textAlign: "center" }}>
          <span>CPF Destinatário</span>
        </div>
      ),
      key: "destinatario",
      width: 250,
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{cpfMask(text.destinatario.cpf)}</span>
        </div>
      ),
    },
    {
      title: "Ações",
      key: "action",
      width: 50,
      render: (record) => {
        return (
          <>
            <ShowDetailsButton
              tooltip="Detalhes da entrega"
              onClick={() => {
                navigate(`/${record.id}`);
              }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setData([]);

    const query = {
      cpf: removeCpfMask(searchCpf),
    };

    api
      .get(`/get?${qs.stringify(query)}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [searchCpf]);

  return (
    <Template>
      <Row justify="space-between">
        <Col>
          <Title level={3}>Entregas</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title level={5}>Filtros</Title>
        </Col>
      </Row>
      <Row gutter={[0, 8]}>
        <Col span={8}>
          <Input
            allowClear
            suffix={<SearchOutlined />}
            placeholder="Pesquise pelo cpf do destinatário"
            value={cpfMask(searchCpf)}
            onChange={(e) => {
              const currValue = e.target.value;
              setSearchCpf(currValue);
              const filteredVals = data.filter((entry) =>
                entry.description.includes(currValue)
              );
              setData(filteredVals);
            }}
          />
        </Col>
        <Col span={24}>
          <CustomTable
            columns={columns}
            data={data}
            emptyText="Nenhuma entrega encontrada."
          />
        </Col>
      </Row>
    </Template>
  );
};

export default Deliveries;
