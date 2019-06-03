import React, { Component } from 'react';
import Router from 'next/router';
import { productsApi } from '../lib/products';
import styled from 'styled-components';
import Preloader from './Preloader';


const SuccessMessage = styled.span`
  font-size:1rem;
  margin: 10px 24px 24px 24px;
  color: #26a69a;
`;

const ErrorMessage = styled.span`
  font-size:1rem;
  margin: 10px 24px 24px 24px;
  color: #ee6e73;
`;

const StyledImagecontaner = styled.div`
  font-size:1rem;
  margin: 10px 0;
  
  max-width: 200px;
  max-heigth:200px;
  overflow: hidden;
`;

const StyledInput = styled.input`
    ${props => props.invalid ? 'border-bottom-color:red !important; border-bottom-width: 2px !important; box-shadow:none !important;' : ''}
`;

const StyledTextarea = styled.textarea`
    ${props => props.invalid ? 'border-bottom-color:red !important; border-bottom-width: 2px !important; box-shadow:none !important;' : ''}
`;


class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            status: null,
            errorText: "",
            successText: "",
            fields: {
                description: '',
                title: '',
                price: '',
                image: '',
                imageHash: ''
            },

            requiredFields: new Set(['description', 'title'])
        };

        if (props.product) {
            this.state.fields.title = props.product.title || '';
            this.state.fields.description = props.product.description || '';
            this.state.fields.price = props.product.price || '';
            this.state.fields.images = props.product.images || '';
        }

        this.form = React.createRef();
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        let form = this.form.current;

        let send = (() => {
            return () => {
                let bodyFormData = new FormData(form);

                productsApi.create(bodyFormData).then((response) => {

                    if (response.status === 'success') {
                        this.setState({
                            status: 'success',
                            errorText: "",
                            successText: response.message || 'Успех'
                        });
                        if (response.productId && !this.props.product) {
                            Router.push(`/product/${response.productId}`);
                        }

                        if (response.image) {
                            this.state.fields.image = response.image;
                        }

                    } else {
                        this.setState({
                            status: 'error',
                            errorText: response.message || 'Ошибка',
                            successText: ''
                        });
                    }
                }).finally(() => {
                    this.setState({
                        loading: false
                    });
                });
            }
        })();


        let invalidFields = [];
        for (let name of this.state.requiredFields) {
            let value = this.state.fields[name].trim();
            if (!value.length) {
                invalidFields.push(name);
            }
        }

        if (invalidFields.length) {
            let updateState = {}

            invalidFields.forEach((name) => {
                updateState[`${name}Invalid`] = true;
            });

            this.setState({
                ...updateState,
                status: 'error',
                errorText: "Необходимо заполнить обязательные поля",
                successText: ""
            });

            return;
        }

        if (!this.state.loading) {
            this.setState({
                loading: true
            }, send);
        }
    };

    onChangeHandler = (event) => {
        let input = event.target;
        this.setState({
            fields: {
                ...this.state.fields,
                [input.name]: event.target.value
            }
        });

        if (this.state.requiredFields.has(input.name)) {
            let value = input.value.trim();
            if (!value.length) {
                this.setState({
                    [input.name + 'Invalid']: true
                });
            } else {
                this.setState({
                    [input.name + 'Invalid']: false
                });
            }
        }
    };


    fileChangeHandler = (event) => {   
        let imageUrl;    
        if(event.target.files.length > 0){
            let file = event.target.files[0];
            productsApi.getSignedRequest({
                name: file.name,
                type: file.type
            }).then(({signedRequest, url, imageHash, status, message}) => {
                if (status === 'success') {
                    console.log(signedRequest, url, imageHash);
                    imageUrl = url;
                    this.setState({
                        fields: {
                            ...this.state.fields,
                            ["imageHash"]: imageHash
                        }
                    });

                    return productsApi.uploadFile({signedRequest, file});
                } else{
                    this.setState({
                        status: 'error',
                        errorText: message || 'Ошибка',
                        successText: ''
                    });

                    return false;
                }                
            }).then((uploaded) => {
                if(uploaded && imageUrl){
                    this.setState({
                        fields: {
                            ...this.state.fields,
                            ["image"]: imageUrl
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <>

                
                <form encType="multipart/form-data"  ref={this.form} >

                    <div className="row">
                        <div className="input-field col s8">
                            <label htmlFor="product_title_input">Название</label>
                            <StyledInput type="text" id="product_title_input" name="title" onChange={this.onChangeHandler}
                                invalid={this.state.titleInvalid ? 1 : 0} value={this.state.fields.title} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8">
                            <label htmlFor="product_price_input">Цена</label>
                            <StyledInput type="text" id="product_price_input" name="price" onChange={this.onChangeHandler} value={this.state.fields.price} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8">
                            <label htmlFor="product_description_input">Описание</label>
                            <StyledTextarea id="product_description_input" className="materialize-textarea" invalid={this.state.descriptionInvalid ? 1 : 0}
                                name="description" onChange={this.onChangeHandler} value={this.state.fields.description} />
                        </div>
                    </div>

                    <input type="hidden" name="image_src" value={this.state.fields.image} />
                    <input type="hidden" name="image_hash" value={this.state.fields.imageHash} />

                    

                    {this.props.product && this.props.product.id ? <input type="hidden" name="id" value={this.props.product.id} /> : null}
                </form>
                <div className="row">
                    <div className="file-field input-field col s8">
                        <div className="btn">
                            <span>File</span>
                            <input name="image" type="file" onChange={this.fileChangeHandler} />
                        </div>
                        <div className="file-path-wrapper ">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>

                    {this.state.fields.image ?
                        <div>
                            <p>Если  вы загрузите новое  изображение , то  текущее изображение  будет  удалено</p>
                            <StyledImagecontaner><img src={this.state.fields.image} className="responsive-img" /></StyledImagecontaner>
                        </div>
                        : null}
                </div>
                <div className="row">
                        <div className="col s8">
                            {this.state.loading ?
                                <Preloader /> :
                                <>
                                    {this.state.status === 'success' && !this.props.product ? null :
                                        <button className="btn waves-effect waves-light"  name="action" onClick={this.onSubmitHandler}>Submit
                                    <i className="material-icons right">send</i>
                                        </button>
                                    }
                                    {this.state.status === 'success' ? <SuccessMessage>{this.state.successText}</SuccessMessage> : null}
                                    {this.state.status === 'error' ? <ErrorMessage>{this.state.errorText}</ErrorMessage> : null}
                                </>
                            }
                        </div>
                    </div>        

            </>
        );
    }


}

export default ProductForm;