import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router'

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props){
    this.props.createPost(props)
    //if this promise passes, we have .then
      .then(() => {
        //blog post has been created, navigate to index
        //we navigate by calling this.context.router.push with the new path to navigate to
        this.context.router.push('/');
      });
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const title = this.props.fields.title;
    const categories = this.props.fields.categories;
    const content = this.props.fields.content

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type='text' className="form-control" {...title} />
          <div className="text-help">
          {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type='text' className="form-control" {...categories}/>
          <div className="text-help">
          {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content}/>
          <div className="text-help">
          {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter a title';
  }
  if(!values.categories) {
    errors.categories = 'Enter a category';
  }
  if(!values.title) {
    errors.content = 'Enter content';
  }

  return errors;
}

//connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories','content'],
  validate
}, null, { createPost })(PostsNew)

//user types something in.... record it on app state
