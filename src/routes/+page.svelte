<script lang="ts">
  let input = '';
  let ageGroup = 'Grade 3';
  let output = '';
  let loading = false;
  let useBionic = true;
  let model = 'llama3';

  function bionicify(text: string) {
    return text
      .split(' ')
      .map(word => {
        const mid = Math.ceil(word.length / 2);
        return `<strong>${word.slice(0, mid)}</strong>${word.slice(mid)}`;
      })
      .join(' ');
  }

  async function generateQuestions() {
    loading = true;
    output = '';

    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        stream: false,
        prompt: `You are a reading comprehension assistant. Based on the following passage for ${ageGroup} students, generate 3 questions to test understanding. Passage: ${input}`
      })
    });

    const data = await res.json();
    output = data.response;
    loading = false;
  }
</script>

<main class="p-4 max-w-xl mx-auto space-y-4 font-sans">
  <h1 class="text-2xl font-bold">📖 Basa AI: Reading Assistant</h1>

  <select bind:value={model} class="w-full p-2 border rounded">
    <option value="llama3">LLaMA 3</option>
    <option value="mistral">Mistral</option>
    <option value="qwen">Qwen</option>
  </select>

  <textarea
    class="w-full h-32 p-2 border rounded"
    placeholder="Paste a reading passage here..."
    bind:value={input} />

  <select bind:value={ageGroup} class="w-full p-2 border rounded">
    <option>Grade 1</option>
    <option>Grade 3</option>
    <option>Grade 6</option>
    <option>Grade 9</option>
    <option>Grade 12</option>
  </select>

  <label class="flex items-center gap-2">
    <input type="checkbox" bind:checked={useBionic} />
    Use Bionic Reading
  </label>

  <button on:click={generateQuestions} class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={loading}>
    {loading ? 'Generating...' : 'Generate Questions'}
  </button>

  {#if output}
    <div class="mt-4 bg-gray-100 p-4 rounded prose">
      <h2 class="font-semibold mb-2">Generated Questions</h2>
      <div>{@html useBionic ? bionicify(output) : output}</div>
    </div>
  {/if}
</main>
