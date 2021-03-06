import React, { Component } from 'react';
import dataDemo from '../../demoData'
import ArtScore from './ArtScore'
import profile, { NameContext, EmailContext } from "../../context/fileContext";
import Math from "./MathScore"
import { Button } from 'antd'
import { BrowserRouter, Route, Link } from 'react-router-dom'



// const MathScoreWithSubscription = withSubscription(
//     MathScore,
//     (DataSource, props) => DataSource.getMathScore(props)
// );

// const BlogPostWithSubscription = withSubscription(
//     CommentList,
//     (DataSource) => DataSource.getBlogPost()

// );


class Index extends Component {
    constructor(props) {
        super(props)
        this.extras = {
            art: 0,
            math: 0
        };
        this.state = {
            Subject: [],
            Average: 0,
            name: profile.name,
            email: profile.email,
            mathExtra: this.extras.math,
            extras_Average: null,
            artExtra: this.extras.art,
            showArt: true,
            showMath: true,
        };


        dataDemo.averageChangeCb = Average => {
            this.setState({
                Average
            });
            this.handelExtras_Average();
        };
        dataDemo.subjectChangeCb = Subject => {
            this.setState({
                Subject
            });
        };

    }
    Header = () => {
        return (
            <>
                <p>
                    姓名: {this.state.name}
                </p>
                <p>
                    邮箱: {this.state.email}
                </p>
                <p>
                    科目: {this.state.Subject.map(e =>
                    <span key={e.code}>
                        {e.code}:{e.score} /
              </span>
                )}
                </p>
                <p>
                    平均分: {this.state.Average}
                </p>
                <p>
                    附加后平均分: {this.state.extras_Average}
                </p>
            </>
        )
    }
    Mathfun = () => {
        console.log(this.state)
        return (
            <>
                <Link to="/art">下一步</Link>
                <Button onClick={this.toggle.bind(this, "Math")}>
                    显示/隐藏
</Button>
                <NameContext.Provider
                    value={{
                        name: this.state.name,
                        changeName: this.handelContextChange
                    }}
                >
                    {this.state.showMath && <Math
                        title="请输入数学成绩"
                        onExtrasChange={this.handelExtras}
                        extrasElm={(extras, handelExtras) => {
                            this.extras.math = extras;
                            return (
                                <p>
                                    extras:<input
                                        type="number"
                                        name="math"
                                        value={extras}
                                        onChange={handelExtras}
                                    />
                                </p>
                            );
                        }}
                    />
                    }
                </NameContext.Provider>
            </>
        )
    }

    ArtFun = () => {
        console.log(this.state)

        return (
            <>
                <Link to="/result">查看结果</Link>
                <Button onClick={this.toggle.bind(this, "Art")}>
                    显示/隐藏
            </Button>
                <EmailContext.Provider
                    value={{
                        name: this.state.email,
                        changeName: this.handelContextChange
                    }}
                >
                    {this.state.showArt && <ArtScore
                        title="请输入美术成绩"
                        onExtrasChange={this.handelExtras}
                        extrasElm={(extras, handelExtras) => {
                            this.extras.art = extras;
                            return (
                                <p>
                                    extras:<input
                                        type="range"
                                        min="-5"
                                        max="20"
                                        name="art"
                                        value={extras}
                                        onChange={handelExtras}
                                    />
                                    <span>{this.state.artExtra}</span>
                                </p>

                            );
                        }}
                    />}
                </EmailContext.Provider>
            </>
        )
    }
    handelContextChange = e => {
        console.log(e)
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handelExtras = e => {
        e.persist();
        this.extras[e.target.name] = parseInt(e.target.value, 10);
        console.log(e)
        if (e.target.name === "art") {
            this.setState({
                artExtra: this.extras.art
            });
        }
        this.handelExtras_Average();
    };
    handelExtras_Average = () => {
        let extras_Average = null;
        let totle = 0;
        dataDemo._TotalSubject.forEach(e => {
            console.log(e)
            totle += e.score + parseInt(this.extras[e.code], 10);
        });
        extras_Average = (totle / dataDemo._TotalSubject.length).toFixed(2);
        this.setState({
            extras_Average
        });
    };
    toggle = e => {
        const value = e;
        console.log(e)
        this.setState({
            [`show${value}`]: !this.state[`show${value}`]
        });
    };
    render() {
        return (
            <>
                {/* <div className="content">
                    <this.Header />
                    <div className="components">
                        <div className="comonent">
                            <this.Mathfun />
                        </div>
                        <div className="component">
                            <this.ArtFun />
                        </div>
                    </div>
                </div> */}
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={this.Mathfun} />
                        <Route path="/art" exact component={this.ArtFun} />
                        <Route path="/result" exact component={this.Header} />
                    </div>
                </BrowserRouter>
            </>
        )
    }
}

export default Index