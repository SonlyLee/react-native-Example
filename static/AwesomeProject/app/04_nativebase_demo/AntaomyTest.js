import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon } from "native-base";
import FetchNetData from "../02_fetch_demo/FetchNetData";

export default class AntaomyTest extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>Beauty</Title>
                    <Button transparent>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>
                <Content>
                    <FetchNetData />
                </Content>
            </Container>
        )
    }
}