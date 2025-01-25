const { body, validationResult } = require('express-validator')
const usersValidationRules = () => {
  return [
    body('firstName').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide a first name."),
    body('firstName').not().isNumeric().withMessage("Numbers are not allowed."),

    body('lastName').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide a last name."),
    body('lastName').not().isNumeric().withMessage("Numbers are not allowed."),

    body('address').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide an address."),

    body('email').isEmail().normalizeEmail({ gmail_remove_dots: true, gmail_lowercase: true }).withMessage("Please enter a valid email address."),

    body('favoriteColor').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide your favorite color."),    

    body('phone').isMobilePhone().isLength({ min: 10, max: 10}).withMessage("The phone number should include area code and phone as follows: 0470123456"),

    body('birthday').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide birthday as follows: January 15")
  ]
}

const commentsValidationRules = () => {
    return [
      body('firstName').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide a first name."),
      body('firstName').not().isNumeric().withMessage("Numbers are not allowed."),
  
      body('lastName').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide a last name."),
      body('lastName').not().isNumeric().withMessage("Numbers are not allowed."),   
  
      body('date').isDate({format: "MM/DD/YY", delimiters: ['/'] }).withMessage("The date should be entered as follows: MM/DD/YY"),
  
      body('comment').trim().escape().notEmpty().isLength({ min: 2 }).withMessage("Please provide a comment.")
    ]
  }

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
  usersValidationRules,
  validate,
  commentsValidationRules
}