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

```cpp
  auto const N{150};
  for (auto const z : iter::range(-N, N + 1)) {
    for (auto const x : iter::range(-N, N + 1)) {
      // Set model matrix as a translation matrix

      glm::vec3 v_position = glm::vec3(static_cast<float>(x) / 12.5, 0.0f,
                                       static_cast<float>(z) / 12.5);
      float waveHeight =
          amplitude *
              glm::sin(
                  glm::dot(glm::vec2(u_lightDirection.x, u_lightDirection.y),
                           glm::vec2(v_position.x, v_position.z))) *
              (6.283185 / wavelength) -
          time * speed;
      glm::vec3 perturbedPosition =
          v_position + glm::vec3(0.0, waveHeight, 0.0);

      glm::vec3 finalColor =
          glm::vec3(35.0 / 255.0, 35.0 / 255.0, 142.0 / 255.0) *
          (waveHeight / amplitude);

      glm::mat4 model{1.0f};
      model = glm::scale(model, glm::vec3(0.1f));
      model = glm::translate(model,
                             glm::vec3(perturbedPosition.x, perturbedPosition.y,
                                       perturbedPosition.z));
      abcg::glUniformMatrix4fv(m_modelMatrixLoc, 1, GL_FALSE, &model[0][0]);

      abcg::glUniform4f(m_colorLoc, finalColor.x, finalColor.y, finalColor.z,
                        1.0f);

      abcg::glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
    }
  }

  abcg::glBindVertexArray(0);
```
