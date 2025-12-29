// ===== STATE MANAGEMENT =====
const state = {
    currentView: 'login',
    selectedApi: 'v1',
    userData: {
        email: '',
        classCode: ''
    }
};

// ===== API CONFIGURATIONS =====
const API_CONFIG = {
    v1: {
        name: 'Decolecta (V1)',
        url: 'https://api.decolecta.com/v1/reniec/dni',
        getUrl: (dni) => `https://api.decolecta.com/v1/reniec/dni?numero=${dni}`,
        headers: {
            'Authorization': 'Bearer sk_12531.hVZ2aKqd1KOugRzSTwUMeQcODggka8N7',
            'Content-Type': 'application/json'
        },
        parseResponse: (data) => {
            // Decolecta response structure
            if (data.resultado) {
                return {
                    dni: data.resultado.id || data.resultado.dni || '-',
                    nombres: data.resultado.nombres || '-',
                    apellidoPaterno: data.resultado.apellido_paterno || '-',
                    apellidoMaterno: data.resultado.apellido_materno || '-',
                    nombreCompleto: data.resultado.nombre_completo || '-',
                    genero: data.resultado.genero || null,
                    fechaNacimiento: data.resultado.fecha_nacimiento || null,
                    codigoVerificacion: data.resultado.codigo_verificacion || null
                };
            }
            return null;
        }
    },
    v2: {
        name: 'PeruDevs (V2)',
        url: 'https://api.perudevs.com/api/v1/dni/complete',
        getUrl: (dni) => `https://api.perudevs.com/api/v1/dni/complete?document=${dni}&key=cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjk1MjA5ODMyNTNhMzA2MGM3ODg1ZTA0`,
        headers: {
            'Content-Type': 'application/json'
        },
        parseResponse: (data) => {
            // PeruDevs response structure
            if (data.resultado) {
                return {
                    dni: data.resultado.id || data.resultado.dni || '-',
                    nombres: data.resultado.nombres || '-',
                    apellidoPaterno: data.resultado.apellido_paterno || '-',
                    apellidoMaterno: data.resultado.apellido_materno || '-',
                    nombreCompleto: data.resultado.nombre_completo || '-',
                    genero: data.resultado.genero || null,
                    fechaNacimiento: data.resultado.fecha_nacimiento || null,
                    codigoVerificacion: data.resultado.codigo_verificacion || null
                };
            }
            return null;
        }
    },
    v3: {
        name: 'MiApi (V3)',
        url: 'https://miapi.cloud/v1/dni',
        getUrl: (dni) => `https://miapi.cloud/v1/dni/${dni}`,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MDYsImV4cCI6MTc2NzU4OTc4N30.artwYj3RQCtMHew1KLIaT9zXgvZMPBL7f-BAG-zmQi4',
            'Content-Type': 'application/json'
        },
        parseResponse: (data) => {
            // MiApi response structure (assuming similar to others)
            // Adjust based on actual response
            if (data.resultado || data.data) {
                const result = data.resultado || data.data;
                return {
                    dni: result.id || result.dni || result.numero || '-',
                    nombres: result.nombres || result.nombre || '-',
                    apellidoPaterno: result.apellido_paterno || result.apellidoPaterno || '-',
                    apellidoMaterno: result.apellido_materno || result.apellidoMaterno || '-',
                    nombreCompleto: result.nombre_completo || result.nombreCompleto || '-',
                    genero: result.genero || result.sexo || null,
                    fechaNacimiento: result.fecha_nacimiento || result.fechaNacimiento || null,
                    codigoVerificacion: result.codigo_verificacion || result.codigoVerificacion || null
                };
            }
            return null;
        }
    }
};

// ===== DOM ELEMENTS =====
const elements = {
    // Views
    loginView: document.getElementById('loginView'),
    dashboardView: document.getElementById('dashboardView'),
    
    // Login Form
    loginForm: document.getElementById('loginForm'),
    emailInput: document.getElementById('email'),
    classCodeInput: document.getElementById('classCode'),
    loginError: document.getElementById('loginError'),
    
    // Dashboard
    userEmail: document.getElementById('userEmail'),
    userCode: document.getElementById('userCode'),
    userInitial: document.getElementById('userInitial'),
    logoutBtn: document.getElementById('logoutBtn'),
    
    // API Tabs
    tabButtons: document.querySelectorAll('.tab-btn'),
    currentApiText: document.getElementById('currentApi'),
    
    // Query Form
    queryForm: document.getElementById('queryForm'),
    dniInput: document.getElementById('dniInput'),
    
    // States
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    errorMessage: document.getElementById('errorMessage'),
    resultsSection: document.getElementById('resultsSection'),
    
    // Results
    resultDni: document.getElementById('resultDni'),
    resultNombres: document.getElementById('resultNombres'),
    resultPaterno: document.getElementById('resultPaterno'),
    resultMaterno: document.getElementById('resultMaterno'),
    resultCompleto: document.getElementById('resultCompleto'),
    resultGenero: document.getElementById('resultGenero'),
    resultFecha: document.getElementById('resultFecha'),
    resultCodigo: document.getElementById('resultCodigo'),
    resultGeneroContainer: document.getElementById('resultGeneroContainer'),
    resultFechaContainer: document.getElementById('resultFechaContainer'),
    resultCodigoContainer: document.getElementById('resultCodigoContainer')
};

// ===== VALIDATION FUNCTIONS =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@vallegrande\.edu\.pe$/i;
    return emailRegex.test(email);
}

function validateClassCode(code) {
    const codeRegex = /^AS(\d{3})$/i;
    const match = code.match(codeRegex);
    
    if (!match) {
        return { valid: false, message: 'El código debe tener el formato AS### (ej: AS231)' };
    }
    
    const yearPart = parseInt(match[1].substring(0, 2));
    
    if (yearPart < 20) {
        return { valid: false, message: 'El año del código debe ser 20 o superior (ej: AS201, AS231)' };
    }
    
    return { valid: true };
}

// ===== VIEW MANAGEMENT =====
function switchView(viewName) {
    elements.loginView.classList.remove('active');
    elements.dashboardView.classList.remove('active');
    
    if (viewName === 'login') {
        elements.loginView.classList.add('active');
    } else if (viewName === 'dashboard') {
        elements.dashboardView.classList.add('active');
    }
    
    state.currentView = viewName;
}

// ===== LOGIN LOGIC =====
elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = elements.emailInput.value.trim();
    const classCode = elements.classCodeInput.value.trim().toUpperCase();
    
    // Validate email
    if (!validateEmail(email)) {
        showLoginError('❌ Solo se permiten correos @vallegrande.edu.pe');
        return;
    }
    
    // Validate class code
    const codeValidation = validateClassCode(classCode);
    if (!codeValidation.valid) {
        showLoginError(`❌ ${codeValidation.message}`);
        return;
    }
    
    // Success - Store user data and switch to dashboard
    state.userData.email = email;
    state.userData.classCode = classCode;
    
    // Update dashboard UI
    elements.userEmail.textContent = email;
    elements.userCode.textContent = classCode;
    elements.userInitial.textContent = email.charAt(0).toUpperCase();
    
    // Clear form
    elements.loginForm.reset();
    elements.loginError.classList.add('hidden');
    
    // Switch to dashboard
    switchView('dashboard');
});

function showLoginError(message) {
    elements.loginError.textContent = message;
    elements.loginError.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        elements.loginError.classList.add('hidden');
    }, 5000);
}

// ===== LOGOUT LOGIC =====
elements.logoutBtn.addEventListener('click', () => {
    state.userData = { email: '', classCode: '' };
    hideAllStates();
    switchView('login');
});

// ===== API TAB SELECTION =====
elements.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const apiVersion = btn.dataset.api;
        
        // Update active state
        elements.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update state
        state.selectedApi = apiVersion;
        
        // Update indicator
        elements.currentApiText.textContent = API_CONFIG[apiVersion].name;
        
        // Hide previous results
        hideAllStates();
    });
});

// ===== DNI QUERY LOGIC =====
elements.queryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dni = elements.dniInput.value.trim();
    
    // Validate DNI (8 digits)
    if (!/^\d{8}$/.test(dni)) {
        showError('El DNI debe tener exactamente 8 dígitos');
        return;
    }
    
    await queryDNI(dni);
});

async function queryDNI(dni) {
    const apiConfig = API_CONFIG[state.selectedApi];
    
    // Show loading state
    hideAllStates();
    elements.loadingState.classList.remove('hidden');
    
    try {
        const response = await fetch(apiConfig.getUrl(dni), {
            method: 'GET',
            headers: apiConfig.headers
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Parse response based on API
        const parsedData = apiConfig.parseResponse(data);
        
        if (!parsedData) {
            throw new Error('No se encontraron datos para este DNI');
        }
        
        // Display results
        displayResults(parsedData);
        
    } catch (error) {
        console.error('Error querying DNI:', error);
        
        // Check for CORS error
        if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
            showError('⚠️ Error de CORS: No se puede acceder a la API desde el navegador. Intenta usar una extensión para deshabilitar CORS o un proxy local.');
        } else {
            showError(`Error: ${error.message}`);
        }
    }
}

// ===== DISPLAY FUNCTIONS =====
function displayResults(data) {
    hideAllStates();
    
    // Populate result fields
    elements.resultDni.textContent = data.dni;
    elements.resultNombres.textContent = data.nombres;
    elements.resultPaterno.textContent = data.apellidoPaterno;
    elements.resultMaterno.textContent = data.apellidoMaterno;
    elements.resultCompleto.textContent = data.nombreCompleto;
    
    // Optional fields - show/hide based on availability
    if (data.genero) {
        elements.resultGenero.textContent = data.genero;
        elements.resultGeneroContainer.style.display = 'flex';
    } else {
        elements.resultGeneroContainer.style.display = 'none';
    }
    
    if (data.fechaNacimiento) {
        elements.resultFecha.textContent = data.fechaNacimiento;
        elements.resultFechaContainer.style.display = 'flex';
    } else {
        elements.resultFechaContainer.style.display = 'none';
    }
    
    if (data.codigoVerificacion) {
        elements.resultCodigo.textContent = data.codigoVerificacion;
        elements.resultCodigoContainer.style.display = 'flex';
    } else {
        elements.resultCodigoContainer.style.display = 'none';
    }
    
    // Show results section
    elements.resultsSection.classList.remove('hidden');
}

function showError(message) {
    hideAllStates();
    elements.errorMessage.textContent = message;
    elements.errorState.classList.remove('hidden');
}

function hideAllStates() {
    elements.loadingState.classList.add('hidden');
    elements.errorState.classList.add('hidden');
    elements.resultsSection.classList.add('hidden');
}

// ===== INITIALIZATION =====
function init() {
    // Start with login view
    switchView('login');
    
    // Set initial API
    elements.currentApiText.textContent = API_CONFIG[state.selectedApi].name;
    
    console.log('✅ Mounss Tv (DNI) App initialized');
    console.log('📌 Current API:', state.selectedApi);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
