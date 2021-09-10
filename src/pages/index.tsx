import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

//No next temos 3 formas de fazer chamadas para apis
/* 
  Client-side (Usamos em casos onde não e necessário indexação, quando uma 
  informação que é carregada quando é feito por alguma açao do usuário )
*/
/* 
  Server-side (Usamos em casos onde precisamos da indexação mas precisamos de 
  dados dinâmicos na sessão do usuário, informaçoes em tempo real do usuário que
  está acessando) 
*/
/*
   Static Side Generation (Usamos em casos que podemos gerar o html de uma página
   e podemos compartilhar esse html para todas as pessoas que estao acessando a
   aplicação - Ex:HomePage de um blog, post do blog, pagina do produto, 
   pagina da categoria de um ecomerce - Dados Estáticos com indexação)
   Como Utilizar: 
   Importamos -> 
      import { GetStaticProps } from 'next';
   No Fim da pagina criamos uma constante desse modo:
      export const getStaticProps: GetStaticProps = async () => {
        return {
            =>Possuimos esse revalidade que serve para definirmos
              de quanto em quanto tempo o html é gerado.
              (No final do arquivo exemplo completo.)
          revalidate: 60 * 60 * 24, // 24 hours
        }
      }
*/

interface HomeProps {
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome </span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acces to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JYBVbG8hlrW3rLBZtyn1fVo', {
    expand: ['product']
  });

  const product = {
    priceID: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }
  return {
    props:{
      product: product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}