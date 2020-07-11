const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const courses = require('./courses');

const typeDefs = `
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    input CourseInput {
        title: String!
        views: Int
    }

    type Alert{
        message: String
    }

    type Query {
        getCourses(page: Int, limit: Int = 1): [Course]
    }
    
    
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            getCourses(obj, {page, limit}){
                if(page !== undefined){
                    return courses.slice(page * limit, (page + 1) * limit);
                }
                return courses;   
            }
        }
    }
})

const server = new ApolloServer({
    schema
});

server.listen().then( ({url}) => {
    console.log(`Server running on ${url}`);
} )