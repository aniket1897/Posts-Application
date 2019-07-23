import React, { Component } from 'react'
import axios from 'axios';

export default class Posts extends Component {

    state = {
        uid:'',
        allPosts:'',
        displayForm:false,
        title:'',
        desc:''
    };

    async componentDidMount(){
        const posts = await axios({
            url:'http://localhost:3000/api/posts',
            method:'post',
            headers:{
                'auth-token':localStorage.getItem('token')
            },
            data:{
                uid:localStorage.getItem('uid')
            }
        })
        this.setState({allPosts:posts.data.posts});
        this.setState({uid:posts.data.uid});
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        const post = {
            title:this.state.title,
            description:this.state.desc
        };

        this.setState({allPosts:[...this.state.allPosts,post]});
        axios({
            method:'post',
            url:'http://localhost:3000/api/posts/postData',
            headers:{
                'auth-token':localStorage.getItem('token')
            },
            data:{
                uid:localStorage.getItem('uid'),
                title:this.state.title,
                desc:this.state.desc
            }
        })
    }

    onTitleChange = (e) => {
        this.setState({title: e.target.value});
    }

    onDescChange = (e) => {
        this.setState({desc:e.target.value});
    }

    render() {
        const userPosts = this.state.allPosts;
        if(userPosts !== ''){

            const posts = userPosts.map((post,index) => {
                return (
                    <div className="card" key={index} style={{width: '18rem', marginBottom:'10px'}}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.description}</p>
                        </div>
                    </div>
                )
            })
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Posts</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            {posts}
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-success" onClick={() => this.setState({displayForm:true})}>Create Post</button>
                            {
                                this.state.displayForm ? <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Post Title</label>
                                    <input type="text" className="form-control" placeholder="Enter title" value={this.state.title} onChange={this.onTitleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Post Description</label>
                                    <input type="text" className="form-control" placeholder="Enter description" value={this.state.desc} onChange={this.onDescChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>                             
                            </form>:
                            <div></div>
                            }
                            
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    Loading...
                </div>
            )
        }
        // return <p>Loading...</p>
    }
}
