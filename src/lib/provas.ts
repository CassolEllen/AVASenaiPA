import { supabase } from "./supabase";

export type Questao = {
  id: string;
  enunciado: string;
  opcoes: string[];
  correta: number;
};

export type Prova = {
  id: string;
  titulo: string;
  disciplina: string;
  professor: string;
  data: string;
  janela: string;
  codigoAcesso: string;
  questoes: Questao[];
};

export const provaDisponivel: Prova = {
  id: "prova-1",
  titulo: "Prova de Estrutura de Dados",
  disciplina: "Estrutura de Dados",
  professor: "Prof. Doglas André Finco",
  data: "27/06/2026",
  janela: "08:00 - 09:40",
  codigoAcesso: "ESTR2026",
  questoes: [
    {
      id: "q1",
      enunciado: "Qual estrutura de dados utiliza o princípio FIFO (First In, First Out)?",
      opcoes: ["Pilha", "Fila", "Árvore binária", "Tabela hash"],
      correta: 1,
    },
    {
      id: "q2",
      enunciado: "Em uma lista encadeada simples, cada nó armazena, além do valor, uma referência para:",
      opcoes: ["O nó anterior", "O nó raiz", "O próximo nó", "Todos os outros nós"],
      correta: 2,
    },
    {
      id: "q3",
      enunciado: "Qual é a complexidade média de busca em uma árvore binária de busca balanceada?",
      opcoes: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correta: 1,
    },
    {
      id: "q4",
      enunciado: "Qual estrutura de dados utiliza o princípio LIFO (Last In, First Out)?",
      opcoes: ["Fila", "Pilha", "Lista circular", "Grafo"],
      correta: 1,
    },
    {
      id: "q5",
      enunciado: "Em algoritmos de ordenação, qual é a complexidade do Bubble Sort no pior caso?",
      opcoes: ["O(n log n)", "O(log n)", "O(n)", "O(n²)"],
      correta: 3,
    },
    {
      id: "q6",
      enunciado: "O que caracteriza uma árvore binária completa?",
      opcoes: [
        "Todos os nós têm no máximo um filho",
        "Todos os níveis estão totalmente preenchidos, exceto possivelmente o último",
        "Não possui nó raiz",
        "É sempre desbalanceada",
      ],
      correta: 1,
    },
    {
      id: "q7",
      enunciado: "Qual estrutura é mais indicada para implementar um algoritmo de busca em largura (BFS) em um grafo?",
      opcoes: ["Pilha", "Fila", "Árvore AVL", "Tabela hash"],
      correta: 1,
    },
    {
      id: "q8",
      enunciado: "Em uma tabela hash, o que é uma colisão?",
      opcoes: [
        "Quando duas chaves diferentes geram o mesmo índice",
        "Quando a tabela está vazia",
        "Quando o índice é negativo",
        "Quando duas tabelas são comparadas",
      ],
      correta: 0,
    },
  ],
};

export async function validarCodigoAcesso(
  provaId: string,
  codigo: string
): Promise<boolean> {
  const codigoNormalizado = codigo.trim().toUpperCase();

  try {
    const { data, error } = await supabase
      .from("provas")
      .select("id")
      .eq("id", provaId)
      .eq("codigo_acesso", codigoNormalizado)
      .maybeSingle();

    if (!error && data) return true;
  } catch {
    // tabela "provas" ainda não configurada no Supabase; segue com fallback local
  }

  return (
    provaId === provaDisponivel.id &&
    codigoNormalizado === provaDisponivel.codigoAcesso
  );
}