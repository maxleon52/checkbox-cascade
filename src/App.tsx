import React from "react";
import "./style.css";

const fakeData = [
  {
    id: 1,
    nome: "item 1",
    checked: false,
    filhos: [
      {
        id: 1,
        nome: "sub-item 1",
        checked: false,
      },
      {
        id: 2,
        nome: "sub-item 2",
        checked: false,
      },
      {
        id: 3,
        nome: "sub-item 3",
        checked: false,
      },
    ],
  },
  {
    id: 2,
    nome: "item 2",
    checked: false,
    filhos: [
      {
        id: 1,
        nome: "sub-item 1",
        checked: false,
      },
      {
        id: 2,
        nome: "sub-item 2",
        checked: false,
      },
      {
        id: 3,
        nome: "sub-item 3",
        checked: false,
      },
    ],
  },
];
export default function App() {
  const [data, setData] = React.useState(fakeData);

  const handleCheckAll = (value: any) => {
    setData(
      data.map((i) => {
        return {
          ...i,
          checked: value,
          filhos: i.filhos.map((j) => ({ ...j, checked: value })),
        };
      })
    );
  };

  const handleOnChangePai = (idPai: number) => {
    const found = data.find((i) => i.id === idPai);
    if (!found) return;

    found.checked = !found.checked;
    found.filhos = found.filhos.map((i) => ({
      ...i,
      checked: found.checked,
    }));

    setData([...data]);
  };

  const handleOnChangeFilho = (idPai: number, idFilho: number) => {
    const foundPai = data.find((i) => i.id === idPai);
    if (!foundPai) return;

    const foundFilho = foundPai.filhos.find((i) => i.id === idFilho);
    if (!foundFilho) return;

    foundFilho.checked = !foundFilho.checked;

    foundPai.checked = foundPai.filhos.every((i) => i.checked);

    setData([...data]);
  };

  return (
    <div>
      <h1>Checkbox em Cascata</h1>

      <div className="wrapper">
        <header>
          <input
            type="checkbox"
            name=""
            checked={data.every((i) => i.checked)}
            onClick={(e: any) => handleCheckAll(e.target.checked)}
          />
          <span>Selecionar Todos</span>
        </header>

        {data.map((itemPai) => (
          <div className="linha" key={itemPai.id}>
            <input
              type="checkbox"
              name=""
              checked={itemPai.checked}
              onClick={() => handleOnChangePai(itemPai.id)}
            />
            <span>{itemPai.nome}</span>

            <div className="sub-linha">
              {itemPai.filhos.map((itemFilho) => (
                <label htmlFor="" key={itemFilho.id}>
                  <input
                    type="checkbox"
                    name=""
                    checked={itemFilho.checked}
                    onClick={() =>
                      handleOnChangeFilho(itemPai.id, itemFilho.id)
                    }
                  />
                  {itemFilho.nome}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
