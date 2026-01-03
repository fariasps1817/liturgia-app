// Tipos para as Orações Eucarísticas
export interface OracaoSection {
  tipo: 'celebrante' | 'assembleia' | 'todos' | 'rubrica' | 'titulo' | 'aclamacao';
  texto: string;
  destaque?: boolean; // Para palavras da consagração
  opcoes?: AclamacaoOpcao[]; // Para aclamações com múltiplas respostas
}

export interface AclamacaoOpcao {
  celebrante: string;
  assembleia: string;
}

export interface OracaoEucaristica {
  id: string;
  numero: string;
  nome: string;
  descricao: string;
  prefacioFixo?: boolean;
  secoes: OracaoSection[];
}

// ==========================================
// NOVA TRADUÇÃO DO MISSAL ROMANO - 2023
// Baseado na 3ª Edição Típica (CNBB)
// Obrigatória desde 03/12/2023
// ==========================================

// Oração Eucarística II (mais comum)
export const ORACAO_II: OracaoEucaristica = {
  id: 'oracao-ii',
  numero: 'II',
  nome: 'Oração Eucarística II',
  descricao: 'A mais breve e utilizada nas missas feriais',
  prefacioFixo: false,
  secoes: [
    { tipo: 'titulo', texto: 'Diálogo Inicial' },
    { tipo: 'celebrante', texto: 'O Senhor esteja convosco.' },
    { tipo: 'assembleia', texto: 'Ele está no meio de nós.' },
    { tipo: 'celebrante', texto: 'Corações ao alto.' },
    { tipo: 'assembleia', texto: 'O nosso coração está em Deus.' },
    { tipo: 'celebrante', texto: 'Demos graças ao Senhor, nosso Deus.' },
    { tipo: 'assembleia', texto: 'É nosso dever e nossa salvação.' },

    { tipo: 'titulo', texto: 'Prefácio' },
    { tipo: 'celebrante', texto: 'Na verdade, é digno e justo, é nosso dever e salvação dar-vos graças sempre e em todo o lugar, Senhor, Pai santo, por vosso amado Filho, Jesus Cristo. Ele é a vossa Palavra, pela qual tudo criastes. Ele é o nosso Salvador e Redentor, que se encarnou pelo Espírito Santo e nasceu da Virgem Maria. Ele, para cumprir a vossa vontade e adquirir para vós um povo santo, estendeu os braços na hora da sua paixão, a fim de vencer a morte e manifestar a ressurreição. Por isso, com os Anjos e todos os Santos, proclamamos vossa glória, cantando (dizendo) a uma só voz:' },

    { tipo: 'titulo', texto: 'Santo' },
    { tipo: 'todos', texto: 'Santo, Santo, Santo, Senhor Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },

    { tipo: 'titulo', texto: 'Epiclese' },
    { tipo: 'celebrante', texto: 'Na verdade, ó Pai, vós sois Santo, fonte de toda santidade. Santificai, pois, estes dons, derramando sobre eles o vosso Espírito, a fim de que se tornem para nós o Corpo e ✠ o Sangue de nosso Senhor Jesus Cristo.' },
    { tipo: 'assembleia', texto: 'Enviai o vosso Espírito Santo!' },

    { tipo: 'titulo', texto: 'Narrativa da Instituição' },
    { tipo: 'celebrante', texto: 'Estando para ser entregue e abraçando livremente a paixão, Jesus tomou o pão, pronunciou a bênção de ação de graças, partiu e o deu a seus discípulos, dizendo:' },
    { tipo: 'celebrante', texto: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.', destaque: true },
    { tipo: 'celebrante', texto: 'Do mesmo modo, no fim da Ceia, ele tomou o cálice em suas mãos e, dando graças novamente, o entregou a seus discípulos, dizendo:' },
    { tipo: 'celebrante', texto: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR MUITOS, PARA A REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.', destaque: true },

    { tipo: 'titulo', texto: 'Aclamação Memorial' },
    {
      tipo: 'aclamacao',
      texto: 'O celebrante diz uma das aclamações e a assembleia responde:',
      opcoes: [
        {
          celebrante: 'Mistério da fé!',
          assembleia: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!'
        },
        {
          celebrante: 'Mistério da fé e do amor!',
          assembleia: 'Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!'
        },
        {
          celebrante: 'Mistério da fé para a salvação do mundo!',
          assembleia: 'Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição!'
        }
      ]
    },

    { tipo: 'titulo', texto: 'Oblação' },
    { tipo: 'celebrante', texto: 'Celebrando agora, ó Pai, o memorial da paixão redentora do vosso Filho, da sua gloriosa ressurreição e ascensão ao céu, e enquanto esperamos sua nova vinda, nós vos oferecemos em ação de graças este sacrifício vivo e santo.' },
    { tipo: 'assembleia', texto: 'Aceitai, ó Senhor, a nossa oferta!' },

    { tipo: 'celebrante', texto: 'Olhai com bondade a oferta da vossa Igreja; nela vos apresentamos o sacrifício pascal de Cristo, que nos foi entregue. E concedei que, pela força do Espírito do vosso amor, sejamos contados, agora e por toda a eternidade, entre os membros do vosso Filho, cujo Corpo e Sangue comungamos.' },
    { tipo: 'assembleia', texto: 'O Espírito nos una num só corpo!' },

    { tipo: 'titulo', texto: 'Intercessões' },
    { tipo: 'celebrante', texto: 'Lembrai-vos, ó Pai, da vossa Igreja que se faz presente pelo mundo inteiro; que ela cresça na caridade, em comunhão com o papa N., com o nosso bispo N., os bispos do mundo inteiro, os presbíteros, os diáconos e todos os ministros do vosso povo.' },
    { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, da vossa Igreja!' },

    { tipo: 'celebrante', texto: 'Lembrai-vos também dos nossos irmãos e irmãs que adormeceram na esperança da ressurreição e de todos os que partiram desta vida; acolhei-os junto a vós na luz da vossa face.' },
    { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, dos vossos filhos!' },

    { tipo: 'celebrante', texto: 'Enfim, nós vos pedimos, tende piedade de todos nós e dai-nos participar da vida eterna, com a Virgem Maria, Mãe de Deus, São José, seu esposo, os Apóstolos e todos os Santos que neste mundo vos agradaram, para que, convosco, vos louvemos e glorifiquemos, por Jesus Cristo, vosso Filho.' },
    { tipo: 'assembleia', texto: 'Concedei-nos o convívio dos eleitos!' },

    { tipo: 'titulo', texto: 'Doxologia Final' },
    { tipo: 'celebrante', texto: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
    { tipo: 'assembleia', texto: 'Amém!' },
  ]
};

// Oração Eucarística III
export const ORACAO_III: OracaoEucaristica = {
  id: 'oracao-iii',
  numero: 'III',
  nome: 'Oração Eucarística III',
  descricao: 'Rica em conteúdo, para domingos e festas',
  prefacioFixo: false,
  secoes: [
    { tipo: 'titulo', texto: 'Diálogo Inicial' },
    { tipo: 'celebrante', texto: 'O Senhor esteja convosco.' },
    { tipo: 'assembleia', texto: 'Ele está no meio de nós.' },
    { tipo: 'celebrante', texto: 'Corações ao alto.' },
    { tipo: 'assembleia', texto: 'O nosso coração está em Deus.' },
    { tipo: 'celebrante', texto: 'Demos graças ao Senhor, nosso Deus.' },
    { tipo: 'assembleia', texto: 'É nosso dever e nossa salvação.' },

    { tipo: 'titulo', texto: 'Prefácio' },
    { tipo: 'rubrica', texto: 'O celebrante proclama o prefácio próprio do dia ou do tempo litúrgico.' },

    { tipo: 'titulo', texto: 'Santo' },
    { tipo: 'todos', texto: 'Santo, Santo, Santo, Senhor Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },

    { tipo: 'titulo', texto: 'Louvor e Epiclese' },
    { tipo: 'celebrante', texto: 'Na verdade, vós sois Santo, ó Senhor, e com razão vos louva toda criatura. Porque, por Jesus Cristo, vosso Filho e Senhor nosso, e pela força do Espírito Santo, dais vida e santificais todas as coisas, e não cessais de reunir um povo para vós, a fim de que, do nascer ao pôr do sol, seja oferecida uma oblação pura ao vosso nome.' },
    { tipo: 'assembleia', texto: 'Santificai nossa oferenda, ó Senhor!' },

    { tipo: 'celebrante', texto: 'Nós vos suplicamos, portanto: santificai pela vossa graça estas oferendas que vos apresentamos para serem consagradas, a fim de que se tornem o Corpo e ✠ o Sangue de nosso Senhor Jesus Cristo, que nos mandou celebrar este mistério.' },

    { tipo: 'titulo', texto: 'Narrativa da Instituição' },
    { tipo: 'celebrante', texto: 'Na noite em que ia ser entregue, ele tomou o pão, deu graças e o abençoou, partiu e o deu a seus discípulos, dizendo:' },
    { tipo: 'celebrante', texto: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.', destaque: true },
    { tipo: 'celebrante', texto: 'Do mesmo modo, ao fim da ceia, ele tomou o cálice, deu graças e o abençoou, e entregou a seus discípulos, dizendo:' },
    { tipo: 'celebrante', texto: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR MUITOS, PARA A REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.', destaque: true },

    { tipo: 'titulo', texto: 'Aclamação Memorial' },
    {
      tipo: 'aclamacao',
      texto: 'O celebrante diz uma das aclamações e a assembleia responde:',
      opcoes: [
        {
          celebrante: 'Mistério da fé!',
          assembleia: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!'
        },
        {
          celebrante: 'Mistério da fé e do amor!',
          assembleia: 'Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!'
        },
        {
          celebrante: 'Mistério da fé para a salvação do mundo!',
          assembleia: 'Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição!'
        }
      ]
    },

    { tipo: 'titulo', texto: 'Oblação' },
    { tipo: 'celebrante', texto: 'Celebrando, pois, ó Pai, o memorial do vosso Filho, de sua paixão que nos salva, da sua gloriosa ressurreição e ascensão ao céu, e esperando a sua nova vinda, nós vos oferecemos, em ação de graças, este sacrifício vivo e santo.' },
    { tipo: 'assembleia', texto: 'Aceitai, ó Senhor, a nossa oferta!' },

    { tipo: 'celebrante', texto: 'Olhai, com bondade, a oferenda da vossa Igreja e reconhecei nela a Vítima pela qual quisestes reconciliar-nos convosco; e, uma vez nutridos pelo Corpo e Sangue do vosso Filho, e repletos do Espírito Santo, fazei que nos tornemos em Cristo um só corpo e um só espírito.' },
    { tipo: 'assembleia', texto: 'O Espírito nos una num só corpo!' },

    { tipo: 'titulo', texto: 'Intercessões' },
    { tipo: 'celebrante', texto: 'Que ele faça de nós um sacrifício perfeito e eterno, para alcançarmos a herança eterna com os vossos eleitos: antes de tudo com a Virgem Maria, Mãe de Deus, São José, seu esposo, os Apóstolos e Mártires e todos os Santos, por cuja intercessão esperamos alcançar sempre o vosso auxílio.' },
    { tipo: 'assembleia', texto: 'Concedei-nos o convívio dos eleitos!' },

    { tipo: 'celebrante', texto: 'Este sacrifício da nossa reconciliação, ó Pai, traga ao mundo inteiro paz e salvação. Confirmai na fé e na caridade a vossa Igreja, enquanto peregrina nesta terra: o vosso servo o Papa N., o nosso Bispo N., os Bispos do mundo inteiro, os Presbíteros, os Diáconos e todo o povo que conquistastes.' },
    { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, da vossa Igreja!' },

    { tipo: 'celebrante', texto: 'Atendei aos desejos e súplicas desta família que reunistes em vossa presença. Atraí a vós, ó Pai misericordioso, todos os vossos filhos e filhas que ainda estão dispersos.' },

    { tipo: 'celebrante', texto: 'Acolhei com bondade nossos irmãos e irmãs que partiram desta vida e todos os que morreram na vossa graça. Admiti-os a contemplar a vossa luz.' },
    { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, dos vossos filhos!' },

    { tipo: 'celebrante', texto: 'E a todos nós, quando chegar a hora, recebei-nos em vosso Reino, onde esperamos gozar para sempre a vossa glória, por Cristo, Senhor nosso, pelo qual dais ao mundo todo bem.' },

    { tipo: 'titulo', texto: 'Doxologia Final' },
    { tipo: 'celebrante', texto: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
    { tipo: 'assembleia', texto: 'Amém!' },
  ]
};

// Exportar todas as orações
export const ORACOES_EUCARISTICAS: OracaoEucaristica[] = [
  {
    id: 'oracao-i',
    numero: 'I',
    nome: 'Oração Eucarística I',
    descricao: 'Cânon Romano - a mais antiga e solene',
    prefacioFixo: false,
    secoes: [
      { tipo: 'titulo', texto: 'Diálogo Inicial' },
      { tipo: 'celebrante', texto: 'O Senhor esteja convosco.' },
      { tipo: 'assembleia', texto: 'Ele está no meio de nós.' },
      { tipo: 'celebrante', texto: 'Corações ao alto.' },
      { tipo: 'assembleia', texto: 'O nosso coração está em Deus.' },
      { tipo: 'celebrante', texto: 'Demos graças ao Senhor, nosso Deus.' },
      { tipo: 'assembleia', texto: 'É nosso dever e nossa salvação.' },

      { tipo: 'titulo', texto: 'Prefácio' },
      { tipo: 'rubrica', texto: 'O celebrante proclama o prefácio próprio do dia ou do tempo litúrgico.' },

      { tipo: 'titulo', texto: 'Santo' },
      { tipo: 'todos', texto: 'Santo, Santo, Santo, Senhor Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },

      { tipo: 'titulo', texto: 'Te Igitur' },
      { tipo: 'celebrante', texto: 'Pai de misericórdia, a quem sobem nossos louvores, nós vos pedimos por Jesus Cristo, vosso Filho e nosso Senhor, que aceiteis e abençoeis ✠ estes dons, estas oferendas, este sacrifício santo e perfeito, que vos oferecemos antes de tudo pela vossa Igreja santa e católica: concedei-lhe paz e proteção, unindo-a num só corpo e governando-a por toda a terra. E também por vosso servo o Papa N., e pelo nosso Bispo N., e por todos os que guardam a fé católica, transmitida pelos Apóstolos.' },
      { tipo: 'assembleia', texto: 'Abençoai a nossa oferta!' },

      { tipo: 'titulo', texto: 'Memento dos Vivos' },
      { tipo: 'celebrante', texto: 'Lembrai-vos, ó Pai, dos vossos filhos e filhas N. e N. e de todos os que aqui estão reunidos, dos quais conheceis a fé e a dedicação. Por eles, e também por si mesmos, vos oferecem este sacrifício de louvor, por sua redenção, pela esperança do bem e da salvação, e vos dirigem suas preces, a vós, Deus eterno, vivo e verdadeiro.' },

      { tipo: 'titulo', texto: 'Communicantes' },
      { tipo: 'celebrante', texto: 'Em comunhão com toda a Igreja, veneramos a memória da gloriosa sempre Virgem Maria, Mãe de nosso Deus e Senhor, Jesus Cristo, de São José, seu esposo, dos santos Apóstolos e Mártires Pedro e Paulo, André, (Tiago, João, Tomé, Tiago, Filipe, Bartolomeu, Mateus, Simão e Tadeu, Lino, Cleto, Clemente, Sisto, Cornélio, Cipriano, Lourenço, Crisógono, João e Paulo, Cosme e Damião); e de todos os vossos Santos. Por seus méritos e preces, concedei-nos sempre a vossa proteção.' },

      { tipo: 'titulo', texto: 'Epiclese' },
      { tipo: 'celebrante', texto: 'Recebei, ó Pai, com benevolência, a oferenda dos vossos servos e de toda a vossa família. Dai a vossa paz em nossos dias, livrai-nos da condenação eterna e acolhei-nos entre os vossos eleitos.' },
      { tipo: 'assembleia', texto: 'Santificai a nossa oferta!' },

      { tipo: 'celebrante', texto: 'Dignai-vos, ó Deus, ✠ abençoar esta oferenda, recebê-la e aprová-la, para que ela se torne perfeita, espiritual e agradável: o Corpo e ✠ o Sangue do vosso amado Filho, nosso Senhor Jesus Cristo.' },

      { tipo: 'titulo', texto: 'Narrativa da Instituição' },
      { tipo: 'celebrante', texto: 'Na véspera de sua paixão, ele tomou o pão em suas santas e veneráveis mãos e, elevando os olhos ao céu, a vós, ó Deus, seu Pai todo-poderoso, dando-vos graças, abençoou-o, partiu-o e deu-o a seus discípulos, dizendo:' },
      { tipo: 'celebrante', texto: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.', destaque: true },
      { tipo: 'celebrante', texto: 'Do mesmo modo, ao fim da ceia, tomando também este glorioso cálice em suas santas e veneráveis mãos, dando-vos igualmente graças, abençoou-o e deu-o a seus discípulos, dizendo:' },
      { tipo: 'celebrante', texto: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR MUITOS, PARA A REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.', destaque: true },

      { tipo: 'titulo', texto: 'Aclamação Memorial' },
      {
        tipo: 'aclamacao',
        texto: 'O celebrante diz uma das aclamações e a assembleia responde:',
        opcoes: [
          {
            celebrante: 'Mistério da fé!',
            assembleia: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!'
          },
          {
            celebrante: 'Mistério da fé e do amor!',
            assembleia: 'Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!'
          },
          {
            celebrante: 'Mistério da fé para a salvação do mundo!',
            assembleia: 'Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição!'
          }
        ]
      },

      { tipo: 'titulo', texto: 'Anamnese e Oblação' },
      { tipo: 'celebrante', texto: 'Por isso, ó Pai, nós, vossos servos, e também vosso povo santo, celebrando o memorial da paixão redentora, ressurreição e gloriosa ascensão de vosso Filho, Jesus Cristo, nosso Senhor, vos oferecemos, dentre os bens que nos destes, a hóstia ✠ pura, a hóstia ✠ santa, a hóstia ✠ imaculada, o ✠ Pão santo da vida eterna e o ✠ Cálice da eterna salvação.' },
      { tipo: 'assembleia', texto: 'Aceitai, ó Senhor, a nossa oferta!' },

      { tipo: 'celebrante', texto: 'Dignai-vos olhar para esta oferenda com bondade e aceitá-la, como aceitastes os dons do vosso servo Abel, o sacrifício de Abraão, nosso pai na fé, e a oblação pura do vosso sumo sacerdote Melquisedec.' },

      { tipo: 'celebrante', texto: 'Nós vos suplicamos, Deus todo-poderoso: mandai o vosso santo Anjo levar esta oferenda ao altar do céu, diante da vossa divina Majestade. E quando recebermos, pela comunhão deste altar, o sagrado Corpo e Sangue de vosso Filho, sejamos repletos de toda a graça e bênção do céu.' },
      { tipo: 'assembleia', texto: 'O Espírito nos una num só corpo!' },

      { tipo: 'titulo', texto: 'Memento dos Defuntos' },
      { tipo: 'celebrante', texto: 'Lembrai-vos também, ó Pai, dos vossos filhos e filhas N. e N. que, marcados com o sinal da fé, nos precederam e dormem o sono da paz. A eles e a todos os que repousam em Cristo, concedei, ó Pai, a felicidade, a luz e a paz.' },
      { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, dos vossos filhos!' },

      { tipo: 'titulo', texto: 'Nobis Quoque' },
      { tipo: 'celebrante', texto: 'Também a nós, vossos servos pecadores, que esperamos na vossa grande misericórdia, concedei participar da comunidade dos vossos santos Apóstolos e Mártires: João Batista, Estêvão, Matias, Barnabé, (Inácio, Alexandre, Marcelino, Pedro, Felicidade, Perpétua, Águeda, Luzia, Inês, Cecília, Anastácia,) e todos os vossos Santos. Acolhei-nos em vossa amizade, não pesando os nossos méritos, mas perdoando as nossas faltas.' },
      { tipo: 'assembleia', texto: 'Concedei-nos o convívio dos eleitos!' },

      { tipo: 'celebrante', texto: 'Por Cristo, vós, ó Pai, não cessais de criar todos estes bens, e os ✠ santificais, ✠ vivificais, ✠ abençoais e distribuís a nós.' },

      { tipo: 'titulo', texto: 'Doxologia Final' },
      { tipo: 'celebrante', texto: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
      { tipo: 'assembleia', texto: 'Amém!' },
    ]
  },
  ORACAO_II,
  ORACAO_III,
  {
    id: 'oracao-iv',
    numero: 'IV',
    nome: 'Oração Eucarística IV',
    descricao: 'Com prefácio próprio - história da salvação',
    prefacioFixo: true,
    secoes: [
      { tipo: 'titulo', texto: 'Diálogo Inicial' },
      { tipo: 'celebrante', texto: 'O Senhor esteja convosco.' },
      { tipo: 'assembleia', texto: 'Ele está no meio de nós.' },
      { tipo: 'celebrante', texto: 'Corações ao alto.' },
      { tipo: 'assembleia', texto: 'O nosso coração está em Deus.' },
      { tipo: 'celebrante', texto: 'Demos graças ao Senhor, nosso Deus.' },
      { tipo: 'assembleia', texto: 'É nosso dever e nossa salvação.' },

      { tipo: 'titulo', texto: 'Prefácio Próprio' },
      { tipo: 'celebrante', texto: 'Na verdade, é justo dar-vos graças, é bom glorificar-vos, Pai santo, único Deus vivo e verdadeiro, que existis antes de todos os séculos e permaneceis para sempre, habitando numa luz inacessível. Só vós sois bom, fonte da vida, e criastes todas as coisas para as cumular de bênçãos e recreá-las sempre com a vossa luz.' },
      { tipo: 'celebrante', texto: 'Por isso, inumeráveis Anjos vos adoram, e com alegria proclamam a vossa glória. Unindo-nos a eles, também nós vos aclamamos com entusiasmo:' },

      { tipo: 'titulo', texto: 'Santo' },
      { tipo: 'todos', texto: 'Santo, Santo, Santo, Senhor Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },

      { tipo: 'titulo', texto: 'Louvor ao Pai' },
      { tipo: 'celebrante', texto: 'Nós vos bendizemos, ó Pai santo, porque sois grande, e criastes todas as coisas com sabedoria e amor. À vossa imagem formastes o ser humano, a quem confiastes o universo inteiro, para servir só a vós, seu Criador, e dominar sobre todas as criaturas. E quando, por sua desobediência, ele perdeu a vossa amizade, não o abandonastes ao poder da morte.' },
      { tipo: 'assembleia', texto: 'A todos socorrestes com bondade!' },

      { tipo: 'celebrante', texto: 'Para que o buscassem e pudessem encontrá-lo, a todos socorrestes com bondade. Muitas vezes oferecestes aos homens a vossa aliança, e, pelos profetas, os educastes na esperança da salvação. Ó Pai santo, tanto amastes o mundo, que, chegada a plenitude dos tempos, enviastes o vosso Filho Unigênito para ser nosso Salvador.' },
      { tipo: 'assembleia', texto: 'Por amor nos enviastes vosso Filho!' },

      { tipo: 'celebrante', texto: 'Concebido por obra do Espírito Santo e nascido da Virgem Maria, viveu a nossa condição humana em tudo, menos no pecado; anunciou a salvação aos pobres, a libertação aos cativos, a alegria aos aflitos. Para cumprir os vossos desígnios, entregou-se à morte e, ressuscitando, destruiu a morte e renovou a vida.' },

      { tipo: 'titulo', texto: 'Epiclese' },
      { tipo: 'celebrante', texto: 'E, a fim de que não mais vivamos para nós, mas para ele, que por nós morreu e ressuscitou, enviou-nos, ó Pai, o Espírito Santo como primeiro dom aos que creem, para santificar todas as coisas, levando à plenitude a sua obra no mundo.' },
      { tipo: 'assembleia', texto: 'Santificai a nossa oferta!' },

      { tipo: 'celebrante', texto: 'Por isso, ó Pai, nós vos suplicamos: que este mesmo Espírito santifique estes dons, para que se tornem o Corpo ✠ e o Sangue de nosso Senhor Jesus Cristo, na celebração deste grande mistério, que ele próprio nos deixou em sinal da aliança eterna.' },

      { tipo: 'titulo', texto: 'Narrativa da Instituição' },
      { tipo: 'celebrante', texto: 'Quando chegou a hora de ser glorificado por vós, ó Pai santo, tendo amado os seus que estavam no mundo, amou-os até o fim: enquanto ceavam, ele tomou o pão, abençoou-vos, partiu-o e deu-o a seus discípulos, dizendo:' },
      { tipo: 'celebrante', texto: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.', destaque: true },
      { tipo: 'celebrante', texto: 'Do mesmo modo, tomou o cálice com vinho, deu graças, e o entregou a seus discípulos, dizendo:' },
      { tipo: 'celebrante', texto: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR MUITOS, PARA A REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.', destaque: true },

      { tipo: 'titulo', texto: 'Aclamação Memorial' },
      {
        tipo: 'aclamacao',
        texto: 'O celebrante diz uma das aclamações e a assembleia responde:',
        opcoes: [
          {
            celebrante: 'Mistério da fé!',
            assembleia: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!'
          },
          {
            celebrante: 'Mistério da fé e do amor!',
            assembleia: 'Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!'
          },
          {
            celebrante: 'Mistério da fé para a salvação do mundo!',
            assembleia: 'Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição!'
          }
        ]
      },

      { tipo: 'titulo', texto: 'Oblação' },
      { tipo: 'celebrante', texto: 'Eis por que, Senhor, celebrando agora o memorial da nossa redenção, lembramos a morte de Cristo e a sua descida à mansão dos mortos, proclamamos a sua ressurreição e ascensão à vossa direita; e, esperando a sua vinda gloriosa, vos oferecemos o seu Corpo e Sangue, sacrifício do vosso agrado e salvação do mundo inteiro.' },
      { tipo: 'assembleia', texto: 'Aceitai, ó Senhor, a nossa oferta!' },

      { tipo: 'celebrante', texto: 'Olhai, ó Pai, para esta Vítima que vós próprio preparastes para a vossa Igreja; e concedei aos que vão participar do mesmo pão e do mesmo cálice que, reunidos pelo Espírito Santo num só corpo, se tornem em Cristo uma oferenda viva para vosso louvor e vossa glória.' },
      { tipo: 'assembleia', texto: 'O Espírito nos una num só corpo!' },

      { tipo: 'titulo', texto: 'Intercessões' },
      { tipo: 'celebrante', texto: 'Lembrai-vos, Senhor, de quantos vos apresentamos nesta oferenda: primeiramente o vosso servo o Papa N., o nosso Bispo N., os bispos do mundo inteiro, os presbíteros, os diáconos e todo o povo que vos pertence.' },
      { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, da vossa Igreja!' },

      { tipo: 'celebrante', texto: 'Lembrai-vos de todos os que buscam a Deus com coração sincero. Lembrai-vos dos que partiram desta vida na paz de Cristo e de todos os defuntos, cuja fé só vós conheceis.' },
      { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, dos vossos filhos!' },

      { tipo: 'celebrante', texto: 'A todos nós, vossos filhos e filhas, ó Pai de bondade, concedei a herança eterna, com a Virgem Maria, Mãe de Deus, São José, seu esposo, os Apóstolos e os Santos, em vosso Reino, onde, com toda a criação liberta do pecado e da morte, vos glorificaremos, por Cristo, Senhor nosso, pelo qual distribuís ao mundo todo bem.' },
      { tipo: 'assembleia', texto: 'Concedei-nos o convívio dos eleitos!' },

      { tipo: 'titulo', texto: 'Doxologia Final' },
      { tipo: 'celebrante', texto: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
      { tipo: 'assembleia', texto: 'Amém!' },
    ]
  },
  {
    id: 'oracao-v',
    numero: 'V',
    nome: 'Oração Eucarística V',
    descricao: 'Oração do Congresso Eucarístico de Manaus',
    prefacioFixo: true,
    secoes: [
      { tipo: 'titulo', texto: 'Diálogo Inicial' },
      { tipo: 'celebrante', texto: 'O Senhor esteja convosco.' },
      { tipo: 'assembleia', texto: 'Ele está no meio de nós.' },
      { tipo: 'celebrante', texto: 'Corações ao alto.' },
      { tipo: 'assembleia', texto: 'O nosso coração está em Deus.' },
      { tipo: 'celebrante', texto: 'Demos graças ao Senhor, nosso Deus.' },
      { tipo: 'assembleia', texto: 'É nosso dever e nossa salvação.' },

      { tipo: 'titulo', texto: 'Prefácio Próprio' },
      { tipo: 'celebrante', texto: 'É verdadeiramente justo louvar-vos, dar-vos graças, e proclamar as vossas maravilhas, Pai santo, Deus Todo-poderoso. Vós não vos afastais de nós, ainda que tantas vezes nos desviemos do vosso caminho. Para reconduzir-nos a vós, não cessais de estender-nos a mão. Contudo, acima de tudo, através de Jesus Cristo, vosso Filho, nosso Senhor, é que vos aproximais do ser humano.' },
      { tipo: 'celebrante', texto: 'Em seu nome vos damos graças, e, em comunhão com os anjos e com os santos, proclamamos a vossa glória, cantando (dizendo) a uma só voz:' },

      { tipo: 'titulo', texto: 'Santo' },
      { tipo: 'todos', texto: 'Santo, Santo, Santo, Senhor Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },

      { tipo: 'titulo', texto: 'Louvor ao Pai' },
      { tipo: 'celebrante', texto: 'Nós vos bendizemos, Deus de amor; vós que criastes todas as coisas e olhais com ternura para todos os seres que vieram de vossas mãos. Vós enviastes Jesus, vosso Filho, para habitar entre nós. Cheio de vosso Espírito, fez de sua vida um dom, passou pelo mundo fazendo o bem!' },
      { tipo: 'assembleia', texto: 'Ele veio nos trazer vossa salvação!' },

      { tipo: 'celebrante', texto: 'A todos anunciou a boa-nova do Reino, trouxe a luz aos cegos, a liberdade aos oprimidos, e elevou aos pequeninos os segredos divinos. Tendo amado os seus que estavam neste mundo, amou-os até o fim. Antes de morrer, quis ficar para sempre conosco. Durante uma ceia, ofereceu-se a vós e, entregando-se como Salvador, realizou o memorial da nossa Páscoa.' },

      { tipo: 'titulo', texto: 'Epiclese' },
      { tipo: 'celebrante', texto: 'Santificai com o vosso Espírito, ó Pai, o pão e o vinho, frutos da terra e do trabalho humano, para que se tornem o Corpo ✠ e o Sangue de vosso Filho, Jesus Cristo nosso Senhor.' },
      { tipo: 'assembleia', texto: 'Mandai vosso Espírito Santo!' },

      { tipo: 'titulo', texto: 'Narrativa da Instituição' },
      { tipo: 'celebrante', texto: 'Na noite em que Jesus foi entregue, estando à mesa com seus discípulos, tomou o pão em suas mãos, ergueu-o a vós em ação de graças; partiu-o e deu-o a seus discípulos, dizendo:' },
      { tipo: 'celebrante', texto: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.', destaque: true },
      { tipo: 'celebrante', texto: 'Do mesmo modo, tomou o cálice cheio de vinho; ergueu-o a vós em ação de graças e deu-o a seus discípulos, dizendo:' },
      { tipo: 'celebrante', texto: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR MUITOS, PARA A REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.', destaque: true },

      { tipo: 'titulo', texto: 'Aclamação Memorial' },
      {
        tipo: 'aclamacao',
        texto: 'O celebrante diz uma das aclamações e a assembleia responde:',
        opcoes: [
          {
            celebrante: 'Mistério da fé!',
            assembleia: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!'
          },
          {
            celebrante: 'Mistério da fé e do amor!',
            assembleia: 'Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!'
          },
          {
            celebrante: 'Mistério da fé para a salvação do mundo!',
            assembleia: 'Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição!'
          }
        ]
      },

      { tipo: 'titulo', texto: 'Oblação' },
      { tipo: 'celebrante', texto: 'Celebrando este memorial e oferecendo-vos o sacrifício da reconciliação que vós mesmo preparastes, nós vos pedimos: recebei a nós e a nossa oferta, e fazei que, participando do Corpo e Sangue de vosso Filho, nos tornemos para vós uma oferenda agradável.' },
      { tipo: 'assembleia', texto: 'Recebei, ó Senhor, a nossa oferta!' },

      { tipo: 'celebrante', texto: 'Que vosso Espírito, Pai de bondade, se derrame sobre nós e nos una no amor, renovando-nos cada dia pela força desta Eucaristia, que nos transforma no Corpo de Cristo.' },
      { tipo: 'assembleia', texto: 'O Espírito nos una num só corpo!' },

      { tipo: 'titulo', texto: 'Intercessões' },
      { tipo: 'celebrante', texto: 'E porque esta Eucaristia é oferecida pelo mundo inteiro, pela Igreja de toda a terra – o Papa N., o nosso bispo N., os bispos do mundo inteiro, os presbíteros e todos os que servem ao altar – que ela nos ajude a crescer na comunhão da fé e do amor.' },
      { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, da vossa Igreja!' },

      { tipo: 'celebrante', texto: 'Pai, ouvi as preces desta família que reunistes em vossa presença. Fazei voltar a vós todos os vossos filhos, dispersos pelo mundo. Acolhei, misericordiosamente em vosso Reino, nossos irmãos que adormeceram em Cristo, e todos os que deixaram este mundo na vossa amizade.' },
      { tipo: 'assembleia', texto: 'Lembrai-vos, ó Pai, dos vossos filhos!' },

      { tipo: 'celebrante', texto: 'Com eles, esperamos um dia entrar na alegria do vosso eterno Reino, onde, com a Virgem Maria, Mãe de Deus e da Igreja, São José, seu esposo, os Apóstolos, os Mártires e os Santos, vos louvaremos por Jesus Cristo, vosso amado Filho.' },
      { tipo: 'assembleia', texto: 'Concedei-nos o convívio dos eleitos!' },

      { tipo: 'titulo', texto: 'Doxologia Final' },
      { tipo: 'celebrante', texto: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
      { tipo: 'assembleia', texto: 'Amém!' },
    ]
  }
];
