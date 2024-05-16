import * as mongoose from "mongoose";

interface IProduto {
  _id: string;
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagens: string;
}

interface IProducaoSchema {
  status: string;
  produtos: IProduto[];
  clienteId?: string;
}

const produtos = {
  _id: mongoose.Schema.Types.ObjectId,
  nome: { type: String },
  categoria: { type: String },
  preco: { type: Number },
  descricao: { type: String },
  imagens: { type: [String] },
}

export const ProducaoSchema = new mongoose.Schema(
  {
    status: { type: String, require: true },
    produtos: {
      type: [produtos]
    },
    clienteId: { type: String, require: false },
  },
  { timestamps: true }
);

export type ProducaoDocument = mongoose.HydratedDocument<IProducaoSchema>;
export const ProducaoModel = mongoose.model<ProducaoDocument>('Producao', ProducaoSchema);