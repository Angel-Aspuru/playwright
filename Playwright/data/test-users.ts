interface User {
    username: string,
    password: string,
}

interface UserCollection {
    standard: User,
    lockout: User,
    problem: User,
    performance_glitch: User,
    error: User,
    visual: User
}

export const testUsers: UserCollection = {
    standard: {username: 'standard_user', password: 'secret_sauce'},
    lockout: {username: 'locked_out_user', password: 'secret_sauce'},
    problem: {username: 'problem_user', password: 'secret_sauce'},
    performance_glitch: {username: 'performance_glitch_user', password: 'secret_sauce'},
    error: {username: 'error_user', password: 'secret_sauce'},
    visual: {username: 'visual_user', password: 'secret_sauce'},
}