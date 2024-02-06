import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import axios from "axios";

export class DeliveryController {
  async getAll(req: Request, res: Response): Promise<void> {
    const data = await prismaClient.entregas.findMany();

    const { cpf } = req.query;

    if (data.length === 0) {
      const carriers = await axios.get(
        "https://run.mocky.io/v3/e8032a9d-7c4b-4044-9d00-57733a2e2637"
      );

      const deliveries = await axios.get(
        "https://run.mocky.io/v3/6334edd3-ad56-427b-8f71-a3a395c5a0c7"
      );

      for (let i = 0; i < carriers.data.data.length; i++) {
        await prismaClient.transportadoras.create({
          data: {
            id: carriers.data.data[i]._id,
            cnpj: carriers.data.data[i]._cnpj.toString(),
            fantasia: carriers.data.data[i]._fantasia,
          },
        });
      }

      let responseData = [];

      for (let i = 0; i < deliveries.data.data.length; i++) {
        const destinatario = await prismaClient.destinatarios.create({
          data: {
            nome: deliveries.data.data[i]._destinatario._nome,
            cpf: deliveries.data.data[i]._destinatario._cpf,
            endereco: deliveries.data.data[i]._destinatario._endereco,
            estado: deliveries.data.data[i]._destinatario._estado,
            cep: deliveries.data.data[i]._destinatario._cep,
            pais: deliveries.data.data[i]._destinatario._pais,
            lat: deliveries.data.data[i]._destinatario._geolocalizao._lat,
            lng: deliveries.data.data[i]._destinatario._geolocalizao._lng,
          },
        });

        const entrega = await prismaClient.entregas.create({
          data: {
            id: deliveries.data.data[i]._id,
            id_transportadora: deliveries.data.data[i]._id_transportadora,
            id_destinatario: destinatario.id,
            volumes: deliveries.data.data[i]._volumes,
            nome_remetente: deliveries.data.data[i]._remetente._nome,
          },
        });

        let rastreamentos = [];

        for (let j = 0; j < deliveries.data.data[i]._rastreamento.length; j++) {
          const rastreamento = await prismaClient.rastreamento.create({
            data: {
              id_entrega: entrega.id,
              message: deliveries.data.data[i]._rastreamento[j].message,
              date: deliveries.data.data[i]._rastreamento[j].date,
            },
          });
          rastreamentos.push(rastreamento);
        }
        responseData.push({
          entrega: entrega,
          destinatario: destinatario,
          rastreamento: rastreamentos,
        });
      }

      res.status(200).json({
        status: 200,
        message: "Solicitação atendida com sucesso, dados da API externa!",
        data: responseData,
      });
    } else {
      const entregas = await prismaClient.entregas.findMany({
        where: {
          AND: [
            {
              destinatario: {
                AND: [
                  {
                    cpf: {
                      contains: cpf?.toString(),
                    },
                  },
                ],
              },
            },
          ],
        },
        include: {
          destinatario: true,
          rastreamento: true,
        },
      });

      res.status(200).json({
        status: 200,
        message: "Solicitação atendida com sucesso, dados do banco de dados!",
        data: entregas,
      });
    }
  }
  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const entrega = await prismaClient.entregas.findUnique({
      where: {
        id: id,
      },
      include: {
        destinatario: true,
        rastreamento: true,
        transportadora: true,
      },
    });

    if (!entrega) {
      res.status(404).json({
        status: 404,
        message: "Entrega não encontrada!",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Solicitação atendida com sucesso!",
        data: entrega,
      });
    }
  }
}
