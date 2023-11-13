# Atividade 2 de Computação Gráfica

## Ondas de Gerstner Waves

### Introdução

As **Ondas de Gerstner**, também conhecidas como *Gerstner waves*, são um modelo matemático utilizado para simular ondas oceânicas em ambientes de computação gráfica. Esse modelo foi proposto por Johann Gerstner em 1802 e descreve as características complexas das ondas de maneira realista.

### Parâmetros das Ondas de Gerstner

As ondas de Gerstner são definidas por vários parâmetros que afetam a aparência e o comportamento das ondas. Alguns dos principais parâmetros incluem:

1. **Amplitude (A):** A altura máxima da onda.
2. **Comprimento de Onda (λ):** A distância entre dois picos consecutivos ou dois vales consecutivos.
3. **Direção da Onda (D):** A direção para a qual a onda se propaga.
4. **Fase (ϕ):** A posição inicial da onda no espaço e no tempo.

### Exemplo de Código Shader

A implementação das Ondas de Gerstner em um ambiente gráfico geralmente é realizada por meio de shaders. Abaixo estão pedaços de código de um vertex shader e um fragment shader que implementam as Ondas de Gerstner.

#### Vertex Shader

```glsl
#version 330 core

in vec3 inPosition;
out vec4 fragPosition;

uniform float amplitude;
uniform float wavelength;
uniform float phase;
uniform vec2 direction;

void main() {
    // Gerstner Waves equations
    float omega = 2.0 * 3.14159 / wavelength;
    float k = 2.0 * 3.14159 / wavelength;
    float phi = k * dot(normalize(direction), vec2(inPosition.x, inPosition.z)) - omega * phase;

    vec3 displacement = vec3(
        amplitude * cos(omega * phase + phi),
        0.0,
        amplitude * sin(omega * phase + phi)
    );

    gl_Position = projection * view * model * vec4(inPosition + displacement, 1.0);
    fragPosition = model * vec4(inPosition + displacement, 1.0);
}
´´´
#### Fragment Shader

```glsl
#version 330 core

in vec4 fragPosition;
out vec4 fragColor;

void main() {
    // Implement your fragment shader logic here
    // Example: Set the color based on the height of the wave
    float waveHeight = fragPosition.y;
    vec3 color = vec3(0.0, 0.5, 1.0); // Blue color
    float alpha = 1.0 - smoothstep(0.0, 0.2, abs(waveHeight));
    fragColor = vec4(color, alpha);
}
´´´
