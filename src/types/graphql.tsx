import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  DateScalar: any;
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Article = {
  __typename?: 'Article';
  id: Scalars['ID'];
  title?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['JSON']>;
  views: Scalars['Int'];
  helpful: Scalars['Int'];
  notHelpful: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateScalar']>;
  updatedAt?: Maybe<Scalars['DateScalar']>;
  category?: Maybe<ArticleCategory>;
  feedback?: Maybe<Array<Maybe<ArticleFeedback>>>;
  tags?: Maybe<Array<Maybe<ArticleTag>>>;
};

export type ArticleCategory = {
  __typename?: 'ArticleCategory';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  articles?: Maybe<Scalars['Int']>;
};

export type ArticleCategoryPayload = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ArticleComment = {
  __typename?: 'ArticleComment';
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  helpful?: Maybe<Scalars['Int']>;
  notHelpful?: Maybe<Scalars['Int']>;
  isAnswer?: Maybe<Scalars['Boolean']>;
  createdBy?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateScalar']>;
  updatedAt?: Maybe<Scalars['DateScalar']>;
  feedback?: Maybe<Array<Maybe<ArticleCommentFeedback>>>;
};

export type ArticleCommentFeedback = {
  __typename?: 'ArticleCommentFeedback';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  articleComment?: Maybe<ArticleComment>;
};

export type ArticleCommentPaginated = {
  __typename?: 'ArticleCommentPaginated';
  pageNo?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  total?: Maybe<Scalars['Int']>;
  results: Array<Maybe<ArticleComment>>;
};

export type ArticleCommentPayload = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  articleId: Scalars['String'];
};

export type ArticleFeedback = {
  __typename?: 'ArticleFeedback';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  article?: Maybe<Article>;
};

export type ArticlePaginated = {
  __typename?: 'ArticlePaginated';
  pageNo?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  total?: Maybe<Scalars['Int']>;
  results: Array<Maybe<Article>>;
};

export type ArticlePayload = {
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['JSON']>;
  categoryId?: Maybe<Scalars['String']>;
  addTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  removeTags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ArticleTag = {
  __typename?: 'ArticleTag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  article?: Maybe<Article>;
};

export type ArticleTagCloud = {
  __typename?: 'ArticleTagCloud';
  name?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
};

export type ArticleTagPaginated = {
  __typename?: 'ArticleTagPaginated';
  pageNo?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  total?: Maybe<Scalars['Int']>;
  results: Array<Maybe<ArticleTag>>;
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  section?: Maybe<Scalars['JSON']>;
  featuredTitle?: Maybe<Scalars['String']>;
  featuredSubtitle?: Maybe<Scalars['String']>;
  hero?: Maybe<Scalars['JSON']>;
  jwtPassword?: Maybe<Scalars['String']>;
  productionMode?: Maybe<Scalars['Boolean']>;
  assetId?: Maybe<Scalars['String']>;
};

export type AssetAdditionPayload = {
  email?: Maybe<Scalars['String']>;
};

export type AssetPayload = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  section?: Maybe<Scalars['JSON']>;
  featuredTitle?: Maybe<Scalars['String']>;
  featuredSubtitle?: Maybe<Scalars['String']>;
  hero?: Maybe<Scalars['JSON']>;
  jwtPassword?: Maybe<Scalars['String']>;
  productionMode?: Maybe<Scalars['Boolean']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}



export type Mutation = {
  __typename?: 'Mutation';
  createEmailAccount: User;
  updateAsset?: Maybe<Asset>;
  createAsset?: Maybe<Asset>;
  addArticle?: Maybe<Article>;
  deleteArticle?: Maybe<Article>;
  updateArticleComment?: Maybe<ArticleComment>;
  markArticleCommentAsAnswer?: Maybe<ArticleComment>;
  unmarkArticleCommentAsAnswer?: Maybe<ArticleComment>;
  addArticleCommentFeedback?: Maybe<ArticleCommentFeedback>;
  removeArticleCommentFeedback?: Maybe<ArticleCommentFeedback>;
  addArticleCategory?: Maybe<ArticleCategory>;
  addArticleFeedback?: Maybe<ArticleFeedback>;
  removeArticleFeedback?: Maybe<ArticleFeedback>;
  addPost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  updatePostComment?: Maybe<PostComment>;
  markPostCommentAsAnswer?: Maybe<PostComment>;
  unmarkPostCommentAsAnswer?: Maybe<PostComment>;
  addPostCommentFeedback?: Maybe<PostCommentFeedback>;
  removePostCommentFeedback?: Maybe<PostCommentFeedback>;
  addPostFeedback?: Maybe<PostFeedback>;
  removePostFeedback?: Maybe<PostFeedback>;
  followPost?: Maybe<PostFollower>;
  unfollowPost?: Maybe<PostFollower>;
};


export type MutationCreateEmailAccountArgs = {
  payload?: Maybe<UserPayload>;
};


export type MutationUpdateAssetArgs = {
  payload?: Maybe<AssetPayload>;
};


export type MutationCreateAssetArgs = {
  payload?: Maybe<AssetPayload>;
  addition?: Maybe<AssetAdditionPayload>;
};


export type MutationAddArticleArgs = {
  payload?: Maybe<ArticlePayload>;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateArticleCommentArgs = {
  payload: ArticleCommentPayload;
};


export type MutationMarkArticleCommentAsAnswerArgs = {
  id: Scalars['ID'];
};


export type MutationUnmarkArticleCommentAsAnswerArgs = {
  id: Scalars['ID'];
};


export type MutationAddArticleCommentFeedbackArgs = {
  commentId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationRemoveArticleCommentFeedbackArgs = {
  commentId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationAddArticleCategoryArgs = {
  payload?: Maybe<ArticleCategoryPayload>;
};


export type MutationAddArticleFeedbackArgs = {
  articleId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationRemoveArticleFeedbackArgs = {
  articleId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationAddPostArgs = {
  payload?: Maybe<PostPayload>;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePostCommentArgs = {
  payload: PostCommentPayload;
};


export type MutationMarkPostCommentAsAnswerArgs = {
  id: Scalars['ID'];
};


export type MutationUnmarkPostCommentAsAnswerArgs = {
  id: Scalars['ID'];
};


export type MutationAddPostCommentFeedbackArgs = {
  commentId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationRemovePostCommentFeedbackArgs = {
  commentId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationAddPostFeedbackArgs = {
  postId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationRemovePostFeedbackArgs = {
  postId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationFollowPostArgs = {
  postId: Scalars['String'];
};


export type MutationUnfollowPostArgs = {
  postId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  views: Scalars['Int'];
  comments: Scalars['Int'];
  isAnswered: Scalars['Boolean'];
  answeredOn?: Maybe<Scalars['DateScalar']>;
  followers: Scalars['Int'];
  helpful: Scalars['Int'];
  notHelpful: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateScalar']>;
  updatedAt?: Maybe<Scalars['DateScalar']>;
  createdBy?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  feedback?: Maybe<Array<Maybe<PostFeedback>>>;
  followerList?: Maybe<Array<Maybe<PostFollower>>>;
  tags?: Maybe<Array<Maybe<PostTag>>>;
};

export type PostComment = {
  __typename?: 'PostComment';
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  helpful?: Maybe<Scalars['Int']>;
  notHelpful?: Maybe<Scalars['Int']>;
  isAnswer?: Maybe<Scalars['Boolean']>;
  createdBy?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateScalar']>;
  updatedAt?: Maybe<Scalars['DateScalar']>;
  post?: Maybe<Post>;
  feedback?: Maybe<Array<Maybe<PostCommentFeedback>>>;
};

export type PostCommentFeedback = {
  __typename?: 'PostCommentFeedback';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  postComment?: Maybe<PostComment>;
};

export type PostCommentPaginated = {
  __typename?: 'PostCommentPaginated';
  pageNo?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  total?: Maybe<Scalars['Int']>;
  results: Array<Maybe<PostComment>>;
};

export type PostCommentPayload = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type PostFeedback = {
  __typename?: 'PostFeedback';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type PostFollower = {
  __typename?: 'PostFollower';
  id: Scalars['ID'];
  userId?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type PostPaginated = {
  __typename?: 'PostPaginated';
  pageNo?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  total?: Maybe<Scalars['Int']>;
  results: Array<Maybe<Post>>;
};

export type PostPayload = {
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  addTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  removeTags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PostTag = {
  __typename?: 'PostTag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type PostTagCloud = {
  __typename?: 'PostTagCloud';
  name?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
};

export type PostTagPaginated = {
  __typename?: 'PostTagPaginated';
  pageNo?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  total?: Maybe<Scalars['Int']>;
  results: Array<Maybe<PostTag>>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<Maybe<User>>;
  asset?: Maybe<Asset>;
  assetById?: Maybe<Asset>;
  assets?: Maybe<Array<Maybe<Asset>>>;
  newEmailSession?: Maybe<Session>;
  newExternSession?: Maybe<Session>;
  session?: Maybe<UserSession>;
  article?: Maybe<Article>;
  articles?: Maybe<ArticlePaginated>;
  searchArticles?: Maybe<ArticlePaginated>;
  getArticles?: Maybe<ArticlePaginated>;
  articleComments?: Maybe<ArticleCommentPaginated>;
  articleComment?: Maybe<ArticleComment>;
  articleCommentFeedback?: Maybe<Array<Maybe<ArticleCommentFeedback>>>;
  articleCategory?: Maybe<ArticleCategory>;
  articleCategories?: Maybe<Array<Maybe<ArticleCategory>>>;
  articleFeedback?: Maybe<Array<Maybe<ArticleFeedback>>>;
  articleTagCloud?: Maybe<Array<Maybe<ArticleTagCloud>>>;
  articlesByTag?: Maybe<ArticleTagPaginated>;
  post?: Maybe<Post>;
  posts?: Maybe<PostPaginated>;
  searchPosts?: Maybe<PostPaginated>;
  myPosts?: Maybe<PostPaginated>;
  postComments?: Maybe<PostCommentPaginated>;
  postComment?: Maybe<PostComment>;
  postCommentFeedback?: Maybe<Array<Maybe<PostCommentFeedback>>>;
  postFeedback?: Maybe<Array<Maybe<PostFeedback>>>;
  postTagCloud?: Maybe<Array<Maybe<PostTagCloud>>>;
  postsByTag?: Maybe<PostTagPaginated>;
};


export type QueryAssetArgs = {
  assetId: Scalars['String'];
};


export type QueryAssetByIdArgs = {
  id: Scalars['ID'];
};


export type QueryNewEmailSessionArgs = {
  email: Scalars['String'];
};


export type QueryNewExternSessionArgs = {
  token: Scalars['String'];
  asset?: Maybe<Scalars['String']>;
};


export type QuerySessionArgs = {
  key: Scalars['ID'];
  asset?: Maybe<Scalars['String']>;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};


export type QueryArticlesArgs = {
  categoryId: Scalars['ID'];
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QuerySearchArticlesArgs = {
  text?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QueryGetArticlesArgs = {
  text?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QueryArticleCommentsArgs = {
  articleId: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QueryArticleCommentArgs = {
  id: Scalars['ID'];
};


export type QueryArticleCommentFeedbackArgs = {
  commentId: Scalars['ID'];
};


export type QueryArticleCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryArticleFeedbackArgs = {
  articleId: Scalars['ID'];
};


export type QueryArticlesByTagArgs = {
  tag: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QuerySearchPostsArgs = {
  text?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QueryMyPostsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QueryPostCommentsArgs = {
  postId: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};


export type QueryPostCommentArgs = {
  id: Scalars['ID'];
};


export type QueryPostCommentFeedbackArgs = {
  commentId: Scalars['ID'];
};


export type QueryPostFeedbackArgs = {
  postId: Scalars['ID'];
};


export type QueryPostsByTagArgs = {
  tag: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
  pageNo?: Maybe<Scalars['Int']>;
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID'];
  sessionId: Scalars['String'];
  token: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  resolver?: Maybe<Scalars['String']>;
};

export type UserPayload = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type AddArticleMutationVariables = Exact<{
  payload: ArticlePayload;
}>;


export type AddArticleMutation = (
  { __typename?: 'Mutation' }
  & { addArticle?: Maybe<(
    { __typename?: 'Article' }
    & Pick<Article, 'id'>
  )> }
);


export const AddArticleDocument = gql`
    mutation AddArticle($payload: ArticlePayload!) {
  addArticle(payload: $payload) {
    id
  }
}
    `;
export type AddArticleMutationFn = Apollo.MutationFunction<AddArticleMutation, AddArticleMutationVariables>;

/**
 * __useAddArticleMutation__
 *
 * To run a mutation, you first call `useAddArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addArticleMutation, { data, loading, error }] = useAddArticleMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAddArticleMutation(baseOptions?: Apollo.MutationHookOptions<AddArticleMutation, AddArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddArticleMutation, AddArticleMutationVariables>(AddArticleDocument, options);
      }
export type AddArticleMutationHookResult = ReturnType<typeof useAddArticleMutation>;
export type AddArticleMutationResult = Apollo.MutationResult<AddArticleMutation>;
export type AddArticleMutationOptions = Apollo.BaseMutationOptions<AddArticleMutation, AddArticleMutationVariables>;