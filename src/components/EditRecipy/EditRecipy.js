import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert} from 'reactstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';
import { BasicData } from "./BasicData";
import { Ingredients } from "./Ingredients";
import { Method } from "./Method";


export function EditRecipy(){
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [title, setTitle] = useState('');

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => {
        setRecipe(res.data);
        setTitle(res.data.title);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  }, [slug]);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  }


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }



  return (
    <div>
    <form>
      <h1>{title}</h1>

      <input type="text" value={title} onChange={updateTitle} required />

      <p>hello</p>
      <button>Save</button>
      <Link to={`/recipe/${slug}`} >
        <button>Decline</button>
      </Link>
      <BasicData recipe={recipe}  />
      <Ingredients recipe={recipe} />
      <Method recipe={recipe} />
    </form>
    </div>
  );
}
