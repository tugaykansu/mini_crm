export function capitalizeFirst(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function validateName(name:string): string {
    if (!name) return 'Name is required';
    if (name.length < 6) return 'Name must be at least 6 characters long';
    if (!name.includes(' ')) return 'Full name is required';
    return '';
}


export function validatePassword(password: string): string {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Password must contain at least one special character';
    return '';
}

export function validateEmail(email: string): string {
    if (!email) return 'Email is required';
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!expression.test(email)) return 'Email is invalid';
    return '';
}


export function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
}
