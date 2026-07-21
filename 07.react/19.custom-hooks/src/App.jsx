import React from 'react'
import useFetch from './hooks/useFetch'

const App = () => {
  const { loading, error, data } = useFetch("https://fakestoreapi.com/products")

  return (
    <div>
      <div>
        {
          loading ? <h1>loading...</h1> :
            data.map((p, i) => {
              return (
                <div key={i}>
                  <h3>{p.title}</h3>
                  <img src={p.image} style={{
                    width: "50px",
                    height: "50px",
                  }} />
                </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default App