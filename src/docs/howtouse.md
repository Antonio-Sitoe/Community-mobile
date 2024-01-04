# Solar

Tablet comunitário para regiões de Moçambique.

## Features

- Esteja sempre informado com revistas, jornais e notícias.
- Esteja entretido com jogos, novelas, vídeos e livros de banda desenhada.
- Mantenha a meteorologia na palma da sua mão.
- Esteja atento aos preços dos produtos agrícolas e muito mais.

## Estrutura de Pastas do Projeto

O projeto Solar está organizado com uma estrutura convencional, conhecida no mercado, uma vez que usa como core-tech o React Native.

```
android/   -> A pasta onde colocamos todo o código nativo, caso precisemos.
src/       -> A pasta src é onde podemos encontrar todo o projeto.
    src/@types     -> Colocamos todas as tipagens (interfaces, types) personalizadas do TypeScript.
    src/assets     -> Onde colocamos todas as fonts, imagens, ícones, svgs e outros tipos de arquivos estáticos.
    src/components -> Ficam todos os componentes customizados.
    src/constants  -> Customização de fontes e cores.
    src/contexts   -> Pasta que colocamos todos os estados globais da aplicação, usando a ferramenta Zustand.
    src/docs       -> Todos os arquivos da documentação do projeto.
    src/hooks      -> Colocamos todos os hooks customizados.
    src/lib        -> Todas as bibliotecas que precisam de customização, por exemplo (línguas/datas).
    src/utils      -> Pasta que ficam todas as funções auxiliares, ou seja, funções globais que podemos usar em vários locais, por exemplo, funções de conversão de datas, moedas etc.
    src/database   -> A pasta que contém toda a configuração da base de dados offline (WatermelonDB). Lá podemos encontrar schemas, models e funções de leitura e escrita na base de dados.
    src/app        -> Todos os arquivos ou pastas criadas nesta pasta em específico transformam-se em rotas da aplicação.
```

## Ferramentas e Tecnologias Usadas

O Solar usa um número de tecnologias e projetos open-source:

- [Expo](https://expo.dev/) - Expo é uma plataforma open-source para criar aplicativos nativos universais para Android, iOS e web com JavaScript e React.
- [Expo-Router](https://docs.expo.dev/router/introduction/) - Expo Router é um roteador baseado em arquivos para aplicativos React Native e web.
- [WatermelonDB](https://watermelondb.dev/docs) - Banco de dados assíncrono e offline.
- [Dayjs](https://day.js.org/docs/en/installation/installation) - Biblioteca para trabalhar com datas e horas.
- [i18next](https://www.i18next.com/) - Tradução de idiomas.
- [Lucide-react-native](https://github.com/zecos/lucide) - Ícones.
- [React-hook-form](https://react-hook-form.com/get-started) - Biblioteca para formulários.
- [Yup](https://github.com/jquense/yup) - Validação de formulários.
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - Estados globais.
- [React-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animações.
- [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/docs/getting-started/installation) - Desenhar UI.

## Instalação

O projeto requer [Node.js](https://nodejs.org/) V20+ para rodar.

Para instalar as dependências e as devDependencies e rodar o servidor

```sh
cd tablet-solar
yarn install
```

## Desenvolvimento

Gostaria de contribuir? Ótimo!

Siga os comandos abaixo.

Primeiro passo: entrar na repositório

```sh
cd tablet-solar
```

Segundo passo: Executamos o comando abaixo para gerar a build do Android.

```sh
yarn android
```

Terceiro passo: usamos o comando abaixo para rodar o projeto.

```sh
npx expo start ou npx expo start -c
```

Quarto passo: clicar no botão "s" para trocar do expo-go para development build.

### Gerar Release (EAS BUILD)

Para produção de release:

```sh
yarn delivery
```
