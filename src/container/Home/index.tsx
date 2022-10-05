import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

import * as S from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateCard() {
    const formData = new FormData();

    formData.append("avatar", file);

    setIsLoading(true);
    try {
      const { data } = await axios.post("/api", formData, {
        responseType: "blob",
      });

      const file = new Blob([data], { type: "image/jpg" });
      const blobUrl = URL.createObjectURL(file);

      window.open(blobUrl);
    } catch (error) {
      alert("error, please insert all data on form");
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <h1 className="h3 text-white ">Gerador de Avatar ioasys10</h1>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="text-white">Selecione sua foto</Form.Label>
            <Form.Control
              type="file"
              onChange={(e: any) => setFile(e.target.files[0])}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            disabled={isLoading}
            onClick={handleCreateCard}
            className="w-100"
          >
            {isLoading ? "Carregando..." : "Continuar"}
          </Button>
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export default Home;
