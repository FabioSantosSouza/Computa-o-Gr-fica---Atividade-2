#version 300 es

precision highp float;

//uniform float time; // Tempo para animar as ondas
//uniform vec3 lightDirection; // Direção da luz

in vec4 fragWorldPosition;
out vec4 fragColor;

// Função para calcular as ondas de Gerstner
vec3 gerstnerWave(vec3 position, float steepness, float wavelength, float amplitude, float phase, vec3 lightDirection, float time) {
    float k = 2.0 * 3.1416 / wavelength;
    float c = sqrt(9.8 / k);
    float dotProduct = dot(normalize(position), normalize(lightDirection));
    float waveHeight = amplitude * cos(k * dot(position, vec3(1.0, 0.0, 0.0)) - c * time + phase);
    return vec3(0.0, waveHeight * dotProduct, 0.0);
}

void main() {
    // Parâmetros para a onda de Gerstner
    float steepness = 0.1;
    float wavelength = 5.0;
    float amplitude = 0.1;

    // Posição do fragmento no espaço do mundo
    vec3 worldPosition = fragWorldPosition.xyz;

    // Calcula a onda de Gerstner na posição do fragmento
    vec3 waveOffset = gerstnerWave(worldPosition, steepness, wavelength, amplitude, 0.0, vec3(0.0, 0.5, 2.5),0.5);

    // Adiciona a onda à posição original
    vec3 finalPosition = worldPosition + waveOffset;

    // Cor base para o fragmento (pode ser ajustada com base nas propriedades da água)
    vec3 baseColor = vec3(0.0, 0.4, 0.8);

    // Final color considerando a luz e a cor base
    fragColor = vec4(baseColor * (0.5 + 0.5 * waveOffset.y), 1.0);
}
