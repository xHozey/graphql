export const identificationQuery = `
{
  user{
    login
    firstName
    lastName
  }
}
`

export const currentLevel = `
{    
  transaction_aggregate(
        where:{
            type: { _eq: "level" }
            event : {object :{name:{_eq:"Module"}}}
              }){
    aggregate {
    max {
      amount
    }
  }}
}
`

export const skills = `
{
  transaction(
    where: { type: { _like: "skill%" } }
    order_by: { amount: desc }
  ) {
    type
    amount
  }
}
`