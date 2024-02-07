import { Col, Row, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../services/api";

import FormDivider from "../components/FormDivider";
import Loading from "../components/Loading";
import Template from "../template/Template";
import { cpfMask } from "../utils/functions";

const { Title, Text } = Typography;

const Delivery = () => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDelivery = async () => {
    try {
      const response = await api.get(`get/${id}`);
      setDelivery(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDelivery();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Template>
      <Row>
        <Col span={24}>
          <Title level={3}>Entrega - {id}</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormDivider subtitle={"Dados da Entrega"} />
        </Col>
        <Col span={8}>
          <Row>
            <Title level={5}>Volumes:</Title>
          </Row>
          <Row>
            <Text>{delivery.volumes}</Text>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Title level={5}>Remetente:</Title>
          </Row>
          <Row>
            <Text>{delivery.nome_remetente}</Text>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormDivider subtitle={"Dados da transportadora"} />
        </Col>
        <Col span={8}>
          <Row>
            <Title level={5}>CNPJ:</Title>
          </Row>
          <Row>
            <Text>{delivery.transportadora.cnpj}</Text>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Title level={5}>Fantasia:</Title>
          </Row>
          <Row>
            <Text>{delivery.transportadora.fantasia}</Text>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormDivider subtitle={"Dados do rastreamento"} />
        </Col>
        {delivery.rastreamento.map((rastreio, index) => (
          <Col span={6} key={index}>
            <Row>
              <Title level={5}>{rastreio.message}</Title>
            </Row>
            <Row>
              <Text>{dayjs(rastreio.date).format("DD/MM/YYYY HH:mm")}</Text>
            </Row>
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24}>
          <FormDivider subtitle={"Dados do destinatário"} />
        </Col>
        <Col span={6}>
          <Row>
            <Title level={5}>Nome:</Title>
          </Row>
          <Row>
            <Text>{delivery.destinatario.nome}</Text>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Title level={5}>CPF:</Title>
          </Row>
          <Row>
            <Text>{cpfMask(delivery.destinatario.cpf)}</Text>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Title level={5}>Endereço:</Title>
          </Row>
          <Row>
            <Text>{delivery.destinatario.endereco}</Text>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Title level={5}>Estado:</Title>
          </Row>
          <Row>
            <Text>{delivery.destinatario.estado}</Text>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Title level={5}>CEP:</Title>
          </Row>
          <Row>
            <Text>{delivery.destinatario.cep}</Text>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Title level={5}>País:</Title>
          </Row>
          <Row>
            <Text>{delivery.destinatario.pais}</Text>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Title level={5}>Latitude | Longitude:</Title>
          </Row>
          <Row>
            <Text>
              {delivery.destinatario.lat + " | " + delivery.destinatario.lng}
            </Text>
          </Row>
        </Col>
      </Row>
    </Template>
  );
};

export default Delivery;
