import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Modal } from './components';
import styled from 'styled-components'
import GlobalStyle from './globalStyle';

const Title = styled.div`
  color: ${props => {
    const d = new Date();
    const totalMinutes = (d.getHours() * 60) + d.getMinutes();
    let background = '';
    if (totalMinutes < 360 || totalMinutes >= 900) {
      return '#fff;'
    } else {
      return 'rgb(23, 23, 24);'
    }
    }
  };
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -0.14px;
  line-height: 30px;
  border-bottom: 1px solid ${props => {
    const d = new Date();
    const totalMinutes = (d.getHours() * 60) + d.getMinutes();
    let background = '';
    if (totalMinutes < 360 || totalMinutes >= 900) {
      return '#0e0d0d;'
    } else {
      return 'rgba(237, 237, 237, 0.5);'
    }
  }}
  width: 676px;
  padding-bottom: 16px;
`;

const Body = styled.div`
  display: flex;
  width: 676px;
  padding-left: 36px;
  padding-right: 36px;
  padding-top: 75px;
`
const Inner = styled.div`
  width: 676px;
  margin: 0 auto;
`

const ShowMore = styled.span`
  float: right;
  color: ${props => props.color};
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.25px;
  line-height: 19px;
`

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      data: [],
      showModal: false,
      modalIdx: null,
      color: '#21ce99'
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(idx) {
    this.setState({
      showModal: !this.state.showModal,
      modalIdx: idx
    })
  }

  componentDidMount() {
    const d = new Date();
    const totalMinutes = (d.getHours() * 60) + d.getMinutes();
    let background = '';
    if (totalMinutes < 360 || totalMinutes >= 900) {
      document.body.style.background = '#1b1b1d';
    } else {
      document.body.style.background = 'white';
    }
    fetch(`/news/getData${window.location.search}`)
      .then((response) => {
        return response.json()
      })
      .then((body) => {
        this.setState({
          data: body
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <Body>
        <GlobalStyle />
        <Inner>
        <Title>News
        <ShowMore color={this.state.color}>Show More</ShowMore>
        </Title>
        <Container data={this.state.data} modalHandler={this.toggleModal} />
        </Inner>
        {this.state.showModal && (
          <Modal
            id="modal"
            isOpen={this.state.showModal}
            onClose={this.toggleModal}
            article={this.state.data[this.state.modalIdx]}
            idx={this.state.modalIdx}
          />
        )}
      </Body>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('News'))
