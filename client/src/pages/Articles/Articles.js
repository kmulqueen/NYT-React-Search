import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
    state = {
        articles: []
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res => this.setState({ articles: res.data }))
            .catch(err => console.log(err)); 
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Search for Article</h1>
                        </Jumbotron>
                        <form>
                            <Input name="title" placeholder="Title" />
                            <Input name="date" placeholder="Date" />
                            <Input name="url" placeholder="URL" />
                            <FormBtn>Search</FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Results</h1>
                        </Jumbotron>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map(article => (
                                    <ListItem key={article._id}>
                                        <a href={"/articles/" + article._id}>
                                            <strong>
                                                {article.title}
                                            </strong>
                                        </a>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Articles;